<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\SettingService;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{

    public function __construct(protected SettingService $settingService) {}
    use UploadsToCloudinary;

    // update_settings
    public function settings()
    {
        return Inertia::render(
            "admin/setting/index",
            ['setting' => $this->settingService->getSetting()]
        );
    }

    public function update_settings(Request $request)
    {
        $data = $request->all();
        $this->settingService->updateSetting($data);
        return redirect()->back();
    }
}
