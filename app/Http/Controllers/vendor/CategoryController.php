<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\CategoryService;
use App\Traits\UploadsToCloudinary;
;

class CategoryController extends Controller
{
    use UploadsToCloudinary;
    public function __construct(protected CategoryService $categoryService) {}


    public function storeCategory(StoreCategoryRequest $request)
    {
        $this->categoryService->store($request);
        return redirect()->back();
    }


    public function updateCategory(UpdateCategoryRequest $request, $id)
    {
        $this->categoryService->update($request, $id);
        return redirect()->back();
    }

   
    public function deleteCategory($id)
    {
        $this->categoryService->destroy($id);
        return redirect()->back();
    }
}
