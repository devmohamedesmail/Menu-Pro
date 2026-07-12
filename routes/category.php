<?php
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;



Route::controller(CategoryController::class)->group(function () {
    Route::post('/store/categories', 'storeCategory')->name('store.category.store')->middleware('auth');
    Route::put('/store/categories/{id}', 'updateCategory')->name('store.category.update')->middleware('auth');
    Route::delete('/store/categories/{id}', 'deleteCategory')->name('store.category.delete')->middleware('auth');
});