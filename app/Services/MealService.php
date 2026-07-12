<?php

namespace App\Services;

use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\StoreMealRequest;
use App\Http\Requests\UpdateMealRequest;
use App\Models\AttributeValue;
use App\Models\Meal;
use App\Models\MealAttribute;
use App\Models\Store;
use App\Services\CloudinaryService;
use App\Traits\UploadsToCloudinary;
use Illuminate\Support\Facades\Auth;

class MealService
{
    use UploadsToCloudinary;
    /**
     * Create a new class instance.
     */
    public function __construct(protected CloudinaryService $cloudinaryService){}

    public function store(StoreMealRequest $request)
    {
        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $data = $request->validated();

        $imagePath = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'meals');

        $meal = $store->meals()->create([
            'category_id'    => $data['category_id'],
            'name_en'        => $data['name_en'],
            'name_ar'        => $data['name_ar'],
            'description_en' => $data['description_en'] ?? null,
            'description_ar' => $request['description_ar'] ?? null,
            'image'          => $imagePath,
            'price'          => $data['price'],
            'sale_price'     => $data['sale_price'] ?? null,
        ]);

        // Handle attributes
        // if ($data->has('attributes')) {
        //     $attributes = json_decode($data->input('attributes'), true);
        //     if (is_array($attributes)) {
        //         foreach ($attributes as $attributeId => $valueId) {
        //             $meal->attributes()->attach($attributeId, [
        //                 'attribute_value_id' => $valueId,
        //             ]);
        //         }
        //     }
        // }

        return $meal;
    }


    public function update(UpdateMealRequest $request, int $id)
    {
        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $meal  = $store->meals()->findOrFail($id);


        $data = $request->validated();


        $data_valid = [
            'category_id'    => $data['category_id'],
            'name_en'        => $data['name_en'],
            'name_ar'        => $data['name_ar'],
            'description_en' => $data['description_en'] ?? null,
            'description_ar' => $data['description_ar'] ?? null,
            'price'          => $data['price'],
            'sale_price'     => $data['sale_price'] ?? null,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadToCloudinary($request->file('image'), 'meals');
        }

        $meal->update($data_valid);
    }

    public function destroy(int $id)
    {
         
        $meal = Meal::findOrFail($id);
        $meal->delete();
        return true;
    }

    public function Add_Meal_Attribute(StoreAttributeValueRequest $request, int $id)
    {
        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $meal  = $store->meals()->findOrFail($id);



        foreach ($request->values as $row) {
            $meal_values = AttributeValue::create([
                'attribute_id' => $row['attribute_id'],
                'meal_id'      => $meal->id,
                'value'        => $row['value'],
                'price'        => $row['price'] ?? 0,
            ]);

            $meal_attributes = MealAttribute::firstOrCreate([
                'meal_id'      => $meal->id,
                'attribute_id' => $row['attribute_id'],
            ]);
        }

        return $meal_values;
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
