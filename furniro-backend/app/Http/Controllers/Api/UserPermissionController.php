<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserPermissionController extends Controller
{
    public function getPermissions():JsonResponse
    {
       
        try {
            if(!Auth::check())
            {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
    
            $user = Auth::user();
            
            $permissions = $user->permissions->pluck('permissions_name');
          
            return response()->json([
                'permissions' => $permissions
            ]);

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }

       
    }
}
