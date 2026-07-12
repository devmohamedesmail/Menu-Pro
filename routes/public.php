<?php

use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;



Route::controller(PublicController::class)->group(function () {
   Route::get('/','landing_page')->name('home');
   Route::get('/contact-us', 'contact_us')->name('contact.us');
    Route::get('/privacy-policy', 'privacy_policy')->name('privacy.policy');
    Route::get('/terms-of-service', 'terms_of_service')->name('terms.of.service');
    Route::get('/plans', 'plans')->name('plans');
    Route::get('/checkout/{plan}', 'checkout_page')->name('checkout.page');
   
});

