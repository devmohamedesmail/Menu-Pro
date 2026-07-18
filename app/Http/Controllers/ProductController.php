<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\ProductService;

class ProductController extends Controller
{
        public function __construct(protected ProductService $productService) {}


    public function storeProduct(StoreProductRequest $request ,int $id)
    {
        $this->productService->store($request , $id);
        return redirect()->back();   
    }

  
    public function updateProduct(UpdateProductRequest $request, int $id)
    {

       $this->productService->update($request, $id);
       return redirect()->back();
       
    }

 
    public function deleteProduct(int $id)
    { 
        $this->productService->destroy($id);
        return redirect()->back();
    }
    
   
    public function Add_Attribute_Product(StoreAttributeValueRequest $request, int $id)
    {
        
        $this->productService->Add_Meal_Attribute($request, $id);
        return redirect()->back();
       
    }

   
    public function deleteAttributeValue($id)
    {
        $this->productService->Delete_Meal_Attribute($id);
        return redirect()->back();
    }
}
