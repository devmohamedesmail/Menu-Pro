<?php

namespace App\Http\Controllers;

use App\Services\CountryService;
use App\Services\StoreService;

use Inertia\Inertia;

class MenuController extends Controller
{

    public function __construct(
        protected StoreService $storeService,
        protected CountryService $countryService
    ) {}




    public function show_store_menu(string $slug, int $store_id, $table = null)
    {
        
       try {
         $storeData = $this->storeService->GetStoreMenu($slug, $store_id, $table);
        
        return Inertia::render("Menu/index", $storeData);
       } catch (\Throwable $th) {
        return $th->getMessage();
       }

    }

   
}
