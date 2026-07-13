<?php

namespace App\Services;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;

class CategoryService
{
    
    public function __construct(protected CloudinaryService $cloudinaryService){}



    public function store(StoreCategoryRequest $request)
    {
        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        if (!$store) {}
        $imagePath = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'categories');

        $category = $store->categories()->create([
            'name_en'  => $request['name_en'],
            'name_ar'  => $request['name_ar'],
            'image'    => $imagePath,
            'position' => $request['position'] ?? 0,
        ]);
        return $category;
    }


    public function update(UpdateCategoryRequest $request, int $id)
    {
        $user     = Auth::user();
        $store    = Store::where('user_id', $user->id)->first();
        $category = $store->categories()->findOrFail($id);


        $data = [
            'name_en'  => $request['name_en'],
            'name_ar'  => $request['name_ar'],
            'position' => $request['position'] ?? $category->position,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->cloudinaryService->uploadToCloudinary($request->file('image'), 'categories');
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
