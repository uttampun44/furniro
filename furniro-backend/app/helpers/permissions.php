<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;



if (!function_exists('hasPermissions')) {

   function hasPermissions()
   {

      try {

        
         $user = Auth::user();


         if (!$user) {
            return response()->json(['error' => 'Not authenticated'], 401);
         }

         $skipRoles = ['Super Admin', 'Admin'];


         $userHasRole = $user->roles->pluck('role_name')->toArray();

         $userPermissions = $user->load('roles.permissions');

     
         $roles = $userPermissions->roles;

         $permissions = $roles->flatMap(function ($role) {
            return $role->permissions;
         });

         if (array_intersect($skipRoles, $userHasRole)) {
            return $permissions;
         } else {

            return $permissions;
         }
      } catch (\Throwable $th) {
         Log::error($th->getMessage());
         return null;
      }
   }
}
