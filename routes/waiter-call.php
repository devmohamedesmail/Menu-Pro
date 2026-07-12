<?php

use App\Http\Controllers\WaiterCallController;
use Illuminate\Support\Facades\Route;

Route::controller(WaiterCallController::class)->group(function(){
    // Route::post('/waiter/call/table/{tableId}/store/{storeId}' ,'waiter_call');
    Route::post('/waiter/call' ,'waiter_call');
});