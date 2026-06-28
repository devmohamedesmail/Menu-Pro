<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{

    public function __construct(protected RoleService $roleService) {}
    public function index()
    {
        return Inertia::render('admin/roles/index', [
            'roles' => $this->roleService->getAll(),
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
         $this->roleService->create($request->validated());
         return redirect()->back();
    }

    public function update(Request $request, int $id)
    {
            $this->roleService->update($request->validated() , $id);
            return redirect()->back();
    }

    public function destroy(int $id)
    {
        $this->roleService->delete($id);
        return redirect()->back();
    }
}
