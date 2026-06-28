<?php

namespace App\Services;

use App\Models\Banner;
use App\Traits\UploadsToCloudinary;
use Inertia\Inertia;

class BannerService
{
    use UploadsToCloudinary;
    public function getAll()
    {
        return Banner::latest()->get();
    }



    public function findById(int $id)
    {
        return Banner::findOrFail($id);
    }



    public function create(array $data)
    {
        $banner = new Banner();

        $banner->title_en = $data['title_en'];
        $banner->title_ar = $data['title_ar'];

        if (isset($data['image'])) {
            $banner->image = $this->uploadToCloudinary(
                $data['image'],
                'stores/banners'
            );
        }

        $banner->save();

        return $banner;
    }


    public function update(int $id, array $data)
    {
        $banner = Banner::findOrFail($id);

        $banner->title_en = $data['title_en'];
        $banner->title_ar = $data['title_ar'];

        if (isset($data['image'])) {
            $banner->image = $this->uploadToCloudinary(
                $data['image'],
                'stores/banners'
            );
        }

        $banner->save();

        return $banner;
    }


    public function delete(int $id)
    {
        $banner = Banner::findOrFail($id);

        $banner->delete();

        return true;
    }
}
