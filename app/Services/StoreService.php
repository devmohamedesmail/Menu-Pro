<?php

namespace App\Services;

use App\Models\Store;
use App\Traits\UploadsToCloudinary;
use Illuminate\Support\Str;

class StoreService
{
    use UploadsToCloudinary;
    public function getAllStores()
    {
        return Store::with('user', 'country')->get();
    }

    public function createStore(array $data)
    {
        
        if (isset($data['image'])) {
            $data['image'] = $this->uploadToCloudinary(
                $data['image'],
                'stores/logos'
            );
        }

        // Upload banner if exists
        if (isset($data['banner'])) {
            $data['banner'] = $this->uploadToCloudinary(
                $data['banner'],
                'stores/banners'
            );
        }

        // Generate slug
        $data['slug'] = Str::slug($data['name']);

        return Store::create($data);
    }


    public function updateStore(int $id, array $data)
    {
        $store = Store::findOrFail($id);

        if (isset($data['image'])) {
            $data['image'] = $this->uploadToCloudinary(
                $data['image'],
                'stores/logos'
            );
        }

        if (isset($data['banner'])) {
            $data['banner'] = $this->uploadToCloudinary(
                $data['banner'],
                'stores/banners'
            );
        }

        if (isset($data['name']) && $data['name'] !== $store->name) {
            $data['slug'] = Str::slug($data['name']);
        }

        $store->update($data);

        return $store;
    }


    public function deleteStore(int $id)
    {
        $store = Store::findOrFail($id);
        $store->delete();

        return true;
    }

    public function toggleStatus(int $id, string $field, bool $value)
    {
        $store = Store::findOrFail($id);

        $store->update([
            $field => $value
        ]);

        return $store;
    }
}
