<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\StoreMealRequest;
use App\Http\Requests\UpdateMealRequest;
use App\Services\MealService;



class MealController extends Controller
{
  

    public function __construct(protected MealService $mealService) {}


    public function storeMeal(StoreMealRequest $request)
    {
        $this->mealService->store($request);
        return redirect()->back();
       
    }

  
    public function updateMeal(UpdateMealRequest $request, $id)
    {

       $this->mealService->update($request, $id);
       return redirect()->back();
       
    }

 
    public function deleteMeal($id)
    { 
        $this->mealService->destroy($id);
        return redirect()->back();
    }
    
    public function storeAttributeValues(StoreAttributeValueRequest $request, $mealId)
    {
        $this->mealService->Add_Meal_Attribute($request, $mealId);
        return redirect()->back();
       
    }

   
    public function deleteAttributeValue($id)
    {
        $this->mealService->Delete_Meal_Attribute($id);
        return redirect()->back();
    }
}
