<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::controller(OrderController::class)->group(function () {
    Route::post('/store/create/order', 'createOrder')->name('store.create.order');
    Route::post('/store/order/{id}/status', 'updateOrderStatus')->name('store.order.update.status')->middleware('auth');
    Route::get('/orders/store/page/{storeId}','orders_store_page')->name("orders.store.page");
});
