<?php

namespace App\Services;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;

class CategoryService
{

    public function __construct(protected CloudinaryService $cloudinaryService) {}



    public function store(StoreCategoryRequest $request, int $id)
    {

        $category = new Category();
        $category->store_id = $id;
        $category->name_en = $request->name_en;
        $category->name_ar = $request->name_ar;
        $category->position = $request->position;

        if (isset($request['image'])) {
            $imageResult =  $this->cloudinaryService->uploadToCloudinary(
                $request['image'],
                'stores/logos'
            );

            $category->image = $imageResult['url'] ?? null;
            $category->public_id = $imageResult['public_id'] ?? null;
        }
        $category->save();

        return $category;
    }


    public function update(UpdateCategoryRequest $request, int $id)
    {
        $category = Category::findOrFail($id);
        $data = [
            'name_en'  => $request['name_en'],
            'name_ar'  => $request['name_ar'],
            'position' => $request['position'] ?? $category->position,
        ];

        if ($request->hasFile('image')) {
            $this->cloudinaryService->deleteFromCloudinary($category->public_id);
            $result = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'categories');
            $data['image'] = $result['url'];
            $data['public_id'] = $result['public_id'];
        }

        $category->update($data);
        return $category;
    }

    public function destroy(int $id)
    {
        $category = Category::findOrFail($id);
        $this->cloudinaryService->deleteFromCloudinary($category->public_id);
        $category->delete();
        return true;
    }
}
