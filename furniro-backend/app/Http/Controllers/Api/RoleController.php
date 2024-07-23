<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
               'name' => 'required|string'
            ]);

            if($validator->fails())
            {
              return response()->json([

                    'errors' => $validator->errors()
               ], 422);
            }

         $roles  =  Role::create([
              'name' => $request->name
            ]);

         return  response()->json([
              'status' => true,
              'message' => 'Roles Created Successfully',
              'roles' => $roles
            ], 201);

      } catch (\Throwable $th) {
        Log::error($th->getMessage());
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
