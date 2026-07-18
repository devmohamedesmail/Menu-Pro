
<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)->group(function(){
    Route::get('/vendor/porfile', 'vendor_profile')->name('vendor.profile')->middleware('auth');
    Route::post('/vendor/profile/update', 'update_vendor_profile')->name('vendor.profile.update')->middleware('auth');
});