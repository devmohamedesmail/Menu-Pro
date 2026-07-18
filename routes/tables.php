<?php

use App\Http\Controllers\TableController;
use Illuminate\Support\Facades\Route;


Route::controller(TableController::class)->group(function () {
    Route::post('/store/tables/{storeId}', 'storeTable')->name('store.table.store');
    Route::put('/store/tables/{id}', 'updateTable')->name('store.table.update');
    Route::delete('/store/tables/{id}', 'deleteTable')->name('store.table.delete');
});
