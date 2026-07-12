<?php

use App\Http\Controllers\MealController;
use Illuminate\Support\Facades\Route;


Route::controller(MealController::class)->group(function () {
    Route::post('/store/meals', 'storeMeal')->name('store.meal.store')->middleware('auth');
    Route::put('/store/meals/{id}', 'updateMeal')->name('store.meal.update')->middleware('auth');
    Route::delete('/store/meals/{id}', 'deleteMeal')->name('store.meal.delete')->middleware('auth');
    Route::post('/store/meals/{mealId}/attribute-values', 'storeAttributeValues')->name('store.meal.attribute_values.store')->middleware('auth');
    Route::delete('/store/meal-attribute-values/{id}', 'deleteAttributeValue')->name('store.meal.attribute_values.delete')->middleware('auth');
});