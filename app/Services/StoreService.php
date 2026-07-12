<?php

namespace App\Services;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Models\Attribute;
use App\Models\Store;
use App\Services\CountryService;
use App\Traits\UploadsToCloudinary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StoreService
{

    public function __construct(
        protected CloudinaryService $cloudinaryService,
        protected CountryService $countryService
    ) {}

    use UploadsToCloudinary;

    public function getAllStores()
    {
        return Store::with('user', 'country')->get();
    }

    public function createStore(StoreStoreRequest $request)
    {

        $store = new Store();
        $store->user_id = Auth::user()->id;
        $store->country_id = $request->country_id;
        $store->name = $request->name;
        $store->slug = $request->slug;
        $store->email = $request->email;
        $store->phone = $request->phone;
        $store->address = $request->address;
        $store->description = $request->description;


        if (isset($request['image'])) {
            $imagePath =  $this->cloudinaryService->uploadToCloudinary(
                $request['image'],
                'stores/logos'
            );

            $store->image = $imagePath;
        }

        // // Upload banner if exists
        if (isset($request['banner'])) {
            $bannerPath =  $this->cloudinaryService->uploadToCloudinary(
                $request['banner'],
                'stores/banners'
            );

            $store->banner = $bannerPath;
        }
        $store->save();
        return $store;
    }


    public function updateStore(UpdateStoreRequest $request, int $id)
    {
    //    dd($request);
        $store = Store::findOrFail($id);
        $store->country_id = $request->country_id;
        $store->name = $request->name;
        $store->slug = $request->slug;
        $store->email = $request->store_email;
        $store->phone = $request->store_phone;
        $store->address = $request->store_address;
        $store->description = $request->store_description;


        if (isset($request['image'])) {
            $imagePath =  $this->cloudinaryService->uploadToCloudinary(
                $request['image'],
                'stores/logos'
            );

            $store->image = $imagePath;
        }

        // // Upload banner if exists
        if (isset($request['banner'])) {
            $bannerPath =  $this->cloudinaryService->uploadToCloudinary(
                $request['banner'],
                'stores/banners'
            );

            $store->banner = $bannerPath;
        }
        

        if (isset($request['name']) && $request['name'] !== $store->name) {
            $request['slug'] = Str::slug($request['name']);
        }

        $store->save();

        return $store;
    }


    public function deleteStore(int $id)
    {
        $store = Store::findOrFail($id);
        $store->delete();
        return true;
    }

    public function toggleStatus(int $id, string $field, bool $value)
    {
        $store = Store::findOrFail($id);

        $store->update([
            $field => $value
        ]);

        return $store;
    }



    public function GetStoreMenu($slug, $store_id, $table = null)
    {
        $store = Store::where('id', $store_id)->first();
        $categories = $store->categories;
        $country = $store->country()->first();
        $meals = $store->meals()->with(["category", "attributes.attributeValues"])->paginate(10);
        return [
            "store" => $store,
            "country" => $country,
            "categories" => $categories,
            "meals" => $meals,
            "table" => $table
        ];
    }



    public function GetStoreData()
    {
        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $countries = $this->countryService->getAll();
        if (!$store) {
            return [
                'redirecttoCreate' => true,
                'countries' => $countries
            ];
        }


        $categories = $store->categories()->withCount('meals')->get();
        $meals = $store->meals()->with(["category", "attributes.attributeValues"])->paginate(10);
        $country    = $store->country()->first();
        $orders     = $store->orders()->get();
        $tables     = $store->tables()->get();
        $attributes = Attribute::all();

        $stats = [
            'totalCategories' => $categories->count(),
            'totalMeals'      => $meals->count(),
            'totalOrders'     => $orders->count(),
            'totalRevenue'    => 0,
        ];

        return [
            "store" => $store,
            "categories" => $categories,
            "meals" => $meals,
            "country" => $country,
            "orders" => $orders,
            "tables" => $tables,
            "attributes" => $attributes,
            "stats" => $stats
        ];
    }
}
