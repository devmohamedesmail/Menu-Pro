<?php

namespace App\Services;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Store;
use App\Traits\UploadsToCloudinary;
use Illuminate\Support\Facades\Auth;

class CategoryService
{
    use UploadsToCloudinary;
    public function __construct()
    {
        //
    }



    public function store(StoreCategoryRequest $request)
    {
        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        if (!$store) {
        }
        $data = $request->validated();
        $imagePath = $this->uploadToCloudinary($request->file('image'), 'categories');


        $category = $store->categories()->create([
            'name_en'  => $data['name_en'],
            'name_ar'  => $data['name_ar'],
            'image'    => $imagePath,
            'position' => $data['position'] ?? 0,
        ]);
        return $category;
    }


    public function update(UpdateCategoryRequest $request, int $id)
    {
        $user     = Auth::user();
        $store    = Store::where('user_id', $user->id)->first();
        $category = $store->categories()->findOrFail($id);

        $valid_data = $request->validated();

        $data = [
            'name_en'  => $valid_data['name_en'],
            'name_ar'  => $valid_data['name_ar'],
            'position' => $valid_data['position'] ?? $category->position,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadToCloudinary($request->file('image'), 'categories');
        }

        $category->update($data);
        return $category;
    }

    public function destroy(int $id)
    {
        $user     = Auth::user();
        $store    = Store::where('user_id', $user->id)->first();
        $category = $store->categories()->findOrFail($id);
        $category->delete();
        return true;
    }
}
