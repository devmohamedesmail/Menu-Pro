<?php
namespace App\Services;

use App\Models\Role;

class RoleService{
    public function getAll(){
        return $roles = Role::orderBy('created_at', 'desc')->get();
    }


    public function create(array $data){
        $role = Role::create($data);
        return $role;
    }


    public function update(array $data, int $id){
        $role = Role::find($id);
        $role->update($data);
        return $role;
    }


    public function delete(int $id){
           $role = Role::findOrFail($id);
           $role->delete();
           return true;
    }
}
