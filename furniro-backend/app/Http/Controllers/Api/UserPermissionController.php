<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;



class UserPermissionController extends Controller
{
    public function getPermissions()
    {
       
        if(hasPermissions())
        {
            $userRolesAndPermissions = hasPermissions();
        
            
            if ($userRolesAndPermissions) {
                
                return response()->json([
                    'status' => 'success',
                    'roles_and_permissions' => $userRolesAndPermissions
                ], 200);
            } elseif ($userRolesAndPermissions === false) {
                return response()->json(['error' => 'User does not have the required roles'], 403);
            } else {
                return response()->json(['error' => 'Not authenticated'], 401);
            }

        }
    }
}
