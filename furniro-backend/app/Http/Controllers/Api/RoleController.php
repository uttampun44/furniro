<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\PermissionRole;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();

        return response()->json([
            'status' => true,
            'roles' => $roles  
        ]);
    }

    public function store(Request $request)
    {  
        try {
            $validator = validator($request->all(), [
               'role_name' => 'required|string'
            ]);

            if($validator->fails())
            {
              return response()->json([

                    'errors' => $validator->errors()
               ], 422);
            }

         $roles  =  Role::create([
              'role_name' => $request->role_name,
              'role_slug' => Str::slug($request->role_name)
              
            ]);

         return  response()->json([
              'status' => true,
              'message' => 'Roles Created Successfully',
              'roles' => $roles
            ], 201);

      } catch (\Throwable $th) {
        Log::error($th->getMessage());

        return response()->json([
                'status' => false,
                'message' => "can't create"
        ], 500);
      }
    }

    public function edit($id)
    {
      $permission = Permission::all();

       $roleEdit = Role::findOrFail($id);

       return response()->json([
            'status' => true,
            'roles_edit' => $roleEdit,
            'permission' => $permission,
       ], 200);
    }

    public function update(Request $request, $id)
    {
     
      try {
       
         $role = Role::find($id);


        if (!$role) {
         return response()->json([
             'status' => false,
             'message' => 'Role not found'
         ], 404);
          }

         $permissionIds = $request->input('permissions_id', []);

         foreach ($permissionIds as $permissionId) {

            $permissionRole= PermissionRole::where('permission_id', $permissionId)
                                              ->where('role_id', $role->id)
                                              ->first();
        


            if (!$permissionRole) {
                PermissionRole::create([
                    'permission_id' => 4,
                    'role_id' => $role->id
                ]);

                Log::info("PermissionRole created: ", [
                  'permission_id' => $permissionId,
                  'role_id' => $role->id
              ]);
            }else{
               Log::error("Failed to create PermissionRole: ", [
                  'permission_id' => $permissionId,
                  'role_id' => $role->id
              ]);
            }
           
        }
        return response()->json([
         'status' => true,
         'message' => "Permission Created Sucessfully successfully",
       //   'permission_role' => $permissionRole
         ], 200);
      } 
      catch (\Throwable $th) {
         Log::error($th->getMessage());

         return response()->json([
                 'status' => false,
                 'message' =>  "can't update"
         ], 500);
      }
      

    }

    public function delete($id)
    {
       try {
        $roles = Role::findOrfail($id);

        if($roles)
        {
          $roles->delete();
        }

        return response()->json([
             'status' => true,
             'message' => 'Roles Deleted'
        ], 200);
       } catch (\Throwable $th) {
        Log::error($th->getMessage());
       }
    }
}
