<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserPermissionController extends Controller
{
    public function getPermissions()
    {
       
        try {
           
        
            $user = Auth::user();
        

            $userPermissions = $user->roles()->pluck('role_name')->toArray();

            dd($userPermissions);
        
          

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }

       
    }
}
