<?php

namespace App\Services;

use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\AttributeValue;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Store;
use App\Services\CloudinaryService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductService
{
    public function __construct(protected CloudinaryService $cloudinaryService) {}

    public function store(StoreProductRequest $request, $id)
    {
        // $user  = Auth::user();
        // $store = Store::where('user_id', $user->id)->first();


        // $imagePath = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'meals');

        // $meal = $store->meals()->create([
        //     'category_id'    => $request['category_id'],
        //     'name_en'        => $request['name_en'],
        //     'name_ar'        => $request['name_ar'],
        //     'description_en' => $request['description_en'] ?? null,
        //     'description_ar' => $request['description_ar'] ?? null,
        //     'image'          => $imagePath,
        //     'price'          => $request['price'],
        //     'sale_price'     => $request['sale_price'] ?? null,
        //     'is_simple'     => $request['is_simple'] ?? true,
        //     'is_featured'     => $request['is_featured'] ?? false,
        // ]);
        // return $meal;

        $product = new Product();
        $product->store_id = $id;
        $product->category_id = $request['category_id'];
        $product->name_en = $request['name_en'];
        $product->name_ar = $request['name_ar'];
        $product->description_en = $request['description_en'] ?? null;
        $product->description_ar = $request['description_ar'] ?? null;
        $product->price = $request['price'] ?? null;
        $product->sale_price = $request['sale_price'] ?? null;
        $product->is_simple = $request['is_simple'] ?? true;
        $product->is_featured = $request['is_featured'] ?? false;

        if (isset($request['image'])) {
            $imageResult =  $this->cloudinaryService->uploadToCloudinary(
                $request['image'],
                'products'
            );

            $product->image = $imageResult['url'] ?? null;
            $product->public_id = $imageResult['public_id'] ?? null;
        }


        $product->save();
        return $product;
    }


    public function update(UpdateProductRequest $request, int $id)
    {
        // $user  = Auth::user();
        // $store = Store::where('user_id', $user->id)->first();
        // $meal  = $store->meals()->findOrFail($id);


        // $data = $request->validated();


        // $data_valid = [
        //     'category_id'    => $data['category_id'],
        //     'name_en'        => $data['name_en'],
        //     'name_ar'        => $data['name_ar'],
        //     'description_en' => $data['description_en'] ?? null,
        //     'description_ar' => $data['description_ar'] ?? null,
        //     'price'          => $data['price'],
        //     'sale_price'     => $data['sale_price'] ?? null,
        // ];

        // if ($request->hasFile('image')) {
        //     $data['image'] = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'meals');
        // }

        // $meal->update($data_valid);

        $product =  Product::findOrFail($id);
        $product->store_id = $id;
        $product->category_id = $request['category_id'];
        $product->name_en = $request['name_en'];
        $product->name_ar = $request['name_ar'];
        $product->description_en = $request['description_en'] ?? null;
        $product->description_ar = $request['description_ar'] ?? null;
        $product->price = $request['price'] ?? null;
        $product->sale_price = $request['sale_price'] ?? null;
        $product->is_simple = $request['is_simple'] ?? true;
        $product->is_featured = $request['is_featured'] ?? false;

        if (isset($request['image'])) {
            $this->cloudinaryService->deleteFromCloudinary($product->public_id);
            $imageResult =  $this->cloudinaryService->uploadToCloudinary(
                $request['image'],
                'products'
            );

            $product->image = $imageResult['url'] ?? null;
            $product->public_id = $imageResult['public_id'] ?? null;
        }


        $product->save();
        return $product;
    }

    public function destroy(int $id)
    {

        $meal = Product::findOrFail($id);
        $meal->delete();
        return true;
    }

    public function Add_Meal_Attribute(StoreAttributeValueRequest $request, int $id)
    {

        return DB::transaction(function () use ($request, $id) {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            $meal  = $store->meals()->findOrFail($id);

            // Delete the attributes Values and meal attribute
            AttributeValue::where('meal_id', $meal->id)->delete();
            ProductAttribute::where('meal_id', $meal->id)->delete();



            // create New Attribute
            foreach ($request->values as $row) {
                $meal_values = AttributeValue::create([
                    'attribute_id' => $row['attribute_id'],
                    'meal_id'      => $meal->id,
                    'value'        => $row['value'],
                    'price'        => $row['price'] ?? 0,
                    'is_required' => $row['is_required'] ?? false,
                    'is_default' => $row['is_default'] ?? false

                ]);

                $meal_attributes = ProductAttribute::firstOrCreate([
                    'meal_id'      => $meal->id,
                    'attribute_id' => $row['attribute_id'],
                ]);
            }

            $meal->is_simple = false;
            $meal->save();
            return $meal_values;
        });
    }










    public function Delete_Meal_Attribute(int $id)
    {
        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $attribute_value    = AttributeValue::findOrFail($id);
        $store->meals()->findOrFail($attribute_value->meal_id);
        $attribute_value->delete();
        return true;
    }
}
