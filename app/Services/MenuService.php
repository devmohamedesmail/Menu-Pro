<?php

namespace App\Services;

use App\Models\Store;

class MenuService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }



     public function GetStoreMenu($slug, $store_id, $table = null)
    {
        // $store = Store::where('id', $store_id)->first();
        $store = Store::with('country')->where('id', $store_id)->firstOrFail();
        $categories = $store->categories;
        $country = $store->country()->first();
        $meals = $store->products()->with(["category", "attributes.attributeValues"])->paginate(10);
        return [
            "store" => $store,
            "country" => $country,
            "categories" => $categories,
            "meals" => $meals,
            "table" => $table
        ];
    }
}
