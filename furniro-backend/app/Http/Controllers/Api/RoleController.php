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
               'name' => 'required'
            ]);

            if($validator->fails())
            {
               response()->json([
                    'status' => true,
                    'meesage' => $validator
               ]);
            }

         $roles  =  Role::create([
              'name' => $request->name
            ]);

            response()->json([
              'status' => true,
              'message' => 'Roles Created Successfully',
              'roles' => $roles
            ]);

      } catch (\Throwable $th) {
        Log::error($th->getMessage());
      }
    }
}
