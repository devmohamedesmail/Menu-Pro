<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

Route::controller(MenuController::class)->group(function () {
    Route::get('/store/menu/page/with/qrcode/{slug}/{store_id}/table/{table?}', 'show_store_menu')->name('show.store.menu');
});
