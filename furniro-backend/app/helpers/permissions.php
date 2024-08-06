<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

if(!function_exists('hasPermissions')) {

 function hasPermissions($permission):bool
    {

        $user = Auth::user();

     
        if(!$user){
            return false;
                
        }
        $validRole = ['Super Admin', 'Admin'];
        
        foreach ($user->roles as $role) {


          if(in_array($role->name, $validRole))
          {
              return true;
          }
          if($role->permissions->contains('permission_name', $permission))
         {
                return true;
            }
            
        }

        return false;

    }
}