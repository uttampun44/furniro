<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $user = Auth::user();

            $user_profile = UserDetail::with('user')->where('user_id', $user->id)->get();
        } else {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }
        return response()->json([
            'user_profile' => $user_profile,
        ]);
    }
}
