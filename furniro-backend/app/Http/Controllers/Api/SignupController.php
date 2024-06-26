<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SignupController extends Controller
{
    public function store(Request $request)
    {
        try {
            //    $validate =  Validator::make($request->all(),[
            //         'full_name' => 'required|string|max:255',
            //         'email' => 'required|string|email|max:255|unique:users',
            //         // 'password' => 'required|string|min:8',
            //         'date_of_birth' => 'required|date',
            //         'phone_details' => 'required|string|max:255',
            //         'gender' => 'required'
            //      ]);
         
            //     if($validate->fails())
            //     {
            //         return response()->json(['errors' => $validate->errors()], 422);
            //     }
    
                $user =  User::create([
                    'name' => $request->input('full_name'),
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('password'))
                 ]);
         
                 $token = $user->createToken('authToke')->plainTextToken();
    
                // $userAddress =  UserDetail::create([
                //     'full_name' => $request->input('full_name'),
                //     'email' => $request->input('email'),
                //     'date_of_birth' => $request->input('date_of_birth'),
                //     'phone_details' => $request->input('phone_details'),
                //     'gender' => $request->input('gender'),
                //     'user_id' => 3
                //  ]);
         
                return response()->json([
                    'success' => true,
                    'message' => 'User registered successfully',
                    'user' => $user,
                    // 'user_address' => $userAddress
                    // 'token' => $token
                 ], 201);
                 
            } catch (\Throwable $th) {
                Log::error('Error creating user: ' . $th->getMessage());
                return response()->json(['error' => 'Failed to register user'], 500);
            }
    }
}
