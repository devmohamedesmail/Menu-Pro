<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\CategoryService;


class CategoryController extends Controller
{
     public function __construct(protected CategoryService $categoryService) {}


    public function storeCategory(StoreCategoryRequest $request,$id)
    {
        
        $this->categoryService->store($request , $id);
        return redirect()->back();
    }


    public function updateCategory(UpdateCategoryRequest $request,int $id)
    {
        $this->categoryService->update($request, $id);
        return redirect()->back();
    }

   
    public function deleteCategory(int $id)
    {
        $this->categoryService->destroy($id);
        return redirect()->back();
    }
}
