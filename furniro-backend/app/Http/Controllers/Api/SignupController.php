<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SignupController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
           $validate =  Validator::make($request->all(),[
                'full_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'date_of_birth' => 'required|date',
                'phone_details' => 'required|string|max:255',
                'gender' => 'required|string|in:Male,Female'
             ]);
     
            if($validate->fails())
            {
                return response()->json(['errors' => $validate->errors()], 422);
            }

            $user =  User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password'))
             ]);
     
            //  $token = $user->createToken('authToke')->plainTextToken();

            $userAddress =  UserAddress::create([
                'full_name' => $user->name,
                'email' => $user->email,
                'date_of_birth' => $request->input('date_of_birth'),
                'phone_details' => $request->input('phone_details'),
                'gender' => $request->input('gender'),
                'user_id' => $user->id
             ]);
     
            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'user' => $user,
                'user_address' => $userAddress
                // 'token' => $token
             ], 201);
             
        } catch (\Throwable $th) {
            Log::error('Error creating user: ' . $th->getMessage());
            return response()->json(['error' => 'Failed to register user'], 500);
        }
        
    }
}
