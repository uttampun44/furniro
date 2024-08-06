<?php

use Illuminate\Support\Facades\Auth;

if(!function_exists('hasPermissions')) {

 function hasPermissions($permission):bool
    {

        $user = Auth::user();

        if(!$user){
            return false;
                
        }
        
        foreach ($user->roles as $role) {
            if($role->permissions->contains('permission_name', $permission))
            {
                return true;
            }else{
                return false;
            }
        }

    }
}