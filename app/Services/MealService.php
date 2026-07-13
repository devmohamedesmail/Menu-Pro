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
use Illuminate\Support\Facades\DB;

class MealService
{
    use UploadsToCloudinary;
    /**
     * Create a new class instance.
     */
    public function __construct(protected CloudinaryService $cloudinaryService) {}

    public function store(StoreMealRequest $request)
    {
        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();


        $imagePath = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'meals');

        $meal = $store->meals()->create([
            'category_id'    => $request['category_id'],
            'name_en'        => $request['name_en'],
            'name_ar'        => $request['name_ar'],
            'description_en' => $request['description_en'] ?? null,
            'description_ar' => $request['description_ar'] ?? null,
            'image'          => $imagePath,
            'price'          => $request['price'],
            'sale_price'     => $request['sale_price'] ?? null,
            'is_simple'     => $request['is_simple'] ?? true,
            'is_featured'     => $request['is_featured'] ?? false,
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

        return DB::transaction(function () use ($request, $id) {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            $meal  = $store->meals()->findOrFail($id);

            // Delete the attributes Values and meal attribute
            AttributeValue::where('meal_id', $meal->id)->delete();
            MealAttribute::where('meal_id', $meal->id)->delete();



            // create New Attribute
            foreach ($request->values as $row) {
                $meal_values = AttributeValue::create([
                    'attribute_id' => $row['attribute_id'],
                    'meal_id'      => $meal->id,
                    'value'        => $row['value'],
                    'price'        => $row['price'] ?? 0,
                    'is_required' => $row['is_required'] ?? false,
                    'is_default'=> $row['is_default'] ?? false

                ]);

                $meal_attributes = MealAttribute::firstOrCreate([
                    'meal_id'      => $meal->id,
                    'attribute_id' => $row['attribute_id'],
                ]);
            }

            $meal->is_simple = false;
            $meal->save();
            return $meal_values;
        });

        // $user  = Auth::user();
        // $store = Store::where('user_id', $user->id)->first();
        // $meal  = $store->meals()->findOrFail($id);
        // foreach ($request->values as $row) {
        //     $meal_values = AttributeValue::create([
        //         'attribute_id' => $row['attribute_id'],
        //         'meal_id'      => $meal->id,
        //         'value'        => $row['value'],
        //         'price'        => $row['price'] ?? 0,
        //     ]);

        //     $meal_attributes = MealAttribute::firstOrCreate([
        //         'meal_id'      => $meal->id,
        //         'attribute_id' => $row['attribute_id'],
        //     ]);
        // }

        // $meal->is_simple = false;
        // $meal->save();
        // return $meal_values;
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
