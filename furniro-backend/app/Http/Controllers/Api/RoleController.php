<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
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
       $roleEdit = Role::findOrFail($id);

       return response()->json([
            'status' => true,
            'roles_edit' => $roleEdit
       ], 200);
    }

    public function update(Request $request, $id)
    {

      try {
       
         $rolesUpdate = Role::findOrFail($id);

         $validator = Validator::make($request->all(), [

            'role_name' => 'required|string|max:255'
         ]);

         if($validator->fails())
         {
            return response()->json([
                   'message' => $validator->errors()
            ], 422);
         }

         $rolesUpdate->role_name =  $request->role_name;
         $rolesUpdate->role_slug = Str::slug($request->role_slug);

         $rolesUpdate->save();

         return response()->json([
              'status' => true,
              'message' => "Roles Update successfully"
         ], 200);

      } catch (\Throwable $th) {
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
        $roles = Role::findOrfail();

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
