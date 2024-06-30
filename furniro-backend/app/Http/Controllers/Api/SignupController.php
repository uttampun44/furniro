<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SignupController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            $request->validate([
                'fullname' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'date_of_birth' => 'required|date',
                'phone_details' => 'required|string|max:255',
                'gender' => 'required|string|in:Male,Female'
             ]);
     
            $user =  User::create([
                'name' => $request->input('fullname'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password'))
             ]);
     
            $userAddress =  UserAddress::create([
                'full_name' => $user->name,
                'email' => $user->email,
                'date_of_birth' => $request->input('date_of_birth'),
                'phone_details' => $request->input('phone_details'),
                'gender' => $request->input('gender'),
                'user_id' => $user->id
             ]);
     
             response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'user' => $user,
                'user_address' => $userAddress
             ], 201);
             
        } catch (\Throwable $th) {
            $th->getMessage();
        }
        
    }
}
