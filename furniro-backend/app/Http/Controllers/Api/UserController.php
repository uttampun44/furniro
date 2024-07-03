<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();
        // $user_details = UserDetail::all();

        return response()->json([
            'user' => $user,
            // 'user_details' => $user_details
        ]);
    }
}
