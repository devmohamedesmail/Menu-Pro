<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use Inertia\Inertia;
use App\Services\BannerService;

class BannersController extends Controller
{
   
    public function __construct(protected BannerService $bannerService) {}


    public function index()
    {
        return Inertia::render(
            'admin/banners/index',
            [
                'banners' => $this->bannerService->getAll()
            ]
        );
    }

    /**
     * Store a newly created banner
     */
    public function store(StoreBannerRequest $request)
    {
        $this->bannerService->create($request->validated());
        return redirect()->back();
    }

    /**
     * Show the form for editing the specified banner
     */
    public function edit(int $id)
    {
        return Inertia::render(
            'admin/banners/edit',
            [
                'banner' => $this->bannerService->findById($id)
            ]
        );
    }

    /**
     * Update the specified banner
     */
    public function update(UpdateBannerRequest $request, int $id)
    {
        $this->bannerService->update($id, $request->validated());
        return redirect()->route('banners.page');
    }

    /**
     * Remove the specified banner
     */
    public function delete(int $id)
    {
        $this->bannerService->delete($id);
        return redirect()->route('banners.page');
    }
}
