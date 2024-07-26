<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissionIndex = Permission::all();

        return response()->json([
            'status' => true,
            'permission_index' => $permissionIndex
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $validate = Validator::make($request->all(), [
                'permission_name' => 'required',
                'permission_slug' => 'required'
            ]);

            if ($validate->fails()) {
                return response()->json([
                    'error' => $validate->errors()
                ]);
            }

            Permission::create([

                'permission_name' => $request->permission_name,
                'permission_slug' => $request->permission_slug
            ], 201);

            return response()->json([
                'status' => true,
                'permission_create' => 'Permission Create Successfully'
            ]);
        } catch (\Throwable $th) {
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission, $id)
    {
        $permissionEdit = Permission::findOrFail($id);

        return response()->json([
            'status' => true,
            'permissionEdti' => $permissionEdit
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission, $id)
    {

        try {
    
            Permission::where('id', $id)->update([
                'permission_name' => $request->permission_name,
                'permission_slug' => Str::slug($request->permission_name)
            ], 200);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission, $id)
    {
        $permissionDelete = Permission::findOrFail($id);

        if ($permissionDelete) {
            $permissionDelete->delete();

            return response()->json([
                'status' => true,
                'permissionDelete' => 'Permission Delete Successfully'
            ], 200);
        }
    }
}
