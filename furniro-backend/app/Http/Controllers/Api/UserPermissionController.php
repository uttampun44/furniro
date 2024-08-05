<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPermissionController extends Controller
{
    public function getPermissions()
    {
        $user = Auth::user();

        dd($user->load('roles', 'permissions'));
    }
}
