<?php
namespace App\Services;

use App\Models\Setting;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;

class SettingService{
     use UploadsToCloudinary;
    public function getSetting(){
        return Setting::first();
    }


    public function updateSetting($data){
        $setting = Setting::first();
            if ($setting) {
                $setting->title_en       = $data->title_en;
                $setting->title_ar       = $data->title_ar;
                $setting->description_en = $data->description_en;
                $setting->description_ar = $data->description_ar;
                $setting->keywords_en    = $data->keywords_en;
                $setting->keywords_ar    = $data->keywords_ar;
                $setting->email          = $data->email;
                $setting->phone          = $data->phone;
                $setting->address        = $data->address;
                $setting->currency_en    = $data->currency_en;
                $setting->currency_ar    = $data->currency_ar;

                if ($data->hasFile('logo')) {
                    $imagePath     = $this->uploadToCloudinary($data->file('logo'), 'stores/logos');
                    $setting->logo = $imagePath;
                }
                if ($data->hasFile('favicon')) {
                    $bannerPath       = $this->uploadToCloudinary($data->file('favicon'), 'stores/favicons');
                    $setting->favicon = $bannerPath;
                }

                return $setting->save();
               
            } else {
                $setting                 = new Setting();
                $setting->title_en       = $data->title_en;
                $setting->title_ar       = $data->title_ar;
                $setting->description_en = $data->description_en;
                $setting->description_ar = $data->description_ar;
                $setting->keywords_en    = $data->keywords_en;
                $setting->keywords_ar    = $data->keywords_ar;
                $setting->email          = $data->email;
                $setting->phone          = $data->phone;
                $setting->address        = $data->address;
                $setting->currency_en    = $data->currency_en;
                $setting->currency_ar    = $data->currency_ar;
                if ($data->hasFile('logo')) {
                    $imagePath     = $this->uploadToCloudinary($data->file('logo'), 'stores/logos');
                    $setting->logo = $imagePath;
                }
                if ($data->hasFile('favicon')) {
                    $bannerPath       = $this->uploadToCloudinary($data->file('favicon'), 'stores/favicons');
                    $setting->favicon = $bannerPath;
                }
                $setting->save();
                return $setting;
    }
    }



}