<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStoreRequest;
use App\Models\Country;
use App\Models\Store;
use App\Models\User;
use App\Services\StoreService;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoresController extends Controller
{
    use UploadsToCloudinary;
    public function __construct(protected StoreService $storeService) {}

    public function index()
    {
        $users     = User::all();
        $countries = Country::all();
        return Inertia::render('admin/stores/index', [
            'stores'    => $this->storeService->getAllStores(),
            'users'     => $users,
            'countries' => $countries,
        ]);
    }

    public function store(StoreStoreRequest $request)
    {
        $this->storeService->createStore(
            $request->validated()
        );

        return redirect()->route('stores.page');
    }

    public function update(StoreStoreRequest $request, int $id)
    {
        $this->storeService->updateStore(
            $id,
            $request->validated()
        );
        return redirect()->route('stores.page');
    }

    public function delete(int $id)
    {
        $this->storeService->deleteStore($id);

        return redirect()->route('stores.page');
    }

    public function toggleStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'field' => 'required|in:is_active,is_featured,is_verified',
            'value' => 'required|boolean',
        ]);

        $this->storeService->toggleStatus(
            $id,
            $validated['field'],
            $validated['value']
        );

        return redirect()->route('stores.page');
    }
}
