<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|min:8',
                'date_of_birth' => 'required|date',
                'phone_details' => 'required|string|max:255',
                'gender' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user_details = UserDetail::create([
                'date_of_birth' => $request->date_of_birth,
                'phone_details' => $request->phone_details,
                'image' => $request->image,
                'gender' => $request->gender,
                'user_id' => $user->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'user' => $user,
                'user_details' => $user_details,
            ], 201);
        } catch (\Throwable $th) {
            Log::error('Error creating user: ' . $th->getMessage());
            return response()->json(['error' => 'Failed to register user'], 500);
        }
 
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if(Auth::attempt($credentials))
        {
            $user = Auth::user();

            if($user instanceof \App\Models\User)
            {
                return response()->json([
                    'status' => true,
                    'message' => 'Successfully Logged In',
                    'token' => $user->createToken("Login Token")->plainTextToken,
                    'token_type' => 'bearer',
                    'user_profile' => $user
                ], 200);
            }
        }else{

            response()->json([
                'status' => false,
                'message' => 'Email Or Password not matched',
                
            ], 401);
        }
        
    }

    public function logout(Request $request)
    {
        $user = request()->user();

        if($user)
        {
            $user->currentAccessToken()->delete();

            response()->json([
                'status' => true,
                'message' => 'Successfully Logout'
            ], 200);
        }else{
            response()->json([
                'status' => true,
                'message' => 'No user Authenticated'
            ], 401);
        }

    }

    public function backendLogin(Request $request)
    {

    }
}
