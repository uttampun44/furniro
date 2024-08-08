<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoleUser;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function backendSignup(Request $request)
    {
        DB::beginTransaction();
        try {


            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|min:8',
                'date_of_birth' => 'required|string',
                'image' => 'required',
                'gender' => 'required|string',
                'address' => 'required|string|max:255',
                'telephone' => 'required',
                'mobile' => 'required',
                'role' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $image = null;

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads'), $filename);
                $image = 'uploads/' . $filename;
            }


            $user_details = UserDetail::create([
                'date_of_birth' => $request->date_of_birth,
                'image' => $image,
                'gender' => $request->gender,
                'address' => $request->address,
                'telephone' => $request->telephone,
                'mobile' => $request->mobile,
                'user_id' => $user->id
            ]);
            

            $roleUser = RoleUser::create([
                'role_id' => $request->role,
                'user_id' => $user->id
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'user' => $user,
                'user_details' => $user_details,
                'user_role' => $roleUser
            ], 201);
        } catch (\Throwable $th) {
            Log::error('Error creating user: ' . $th->getMessage());
            DB::rollBack();
            return response()->json(['error' => 'Failed to register user'], 500);
        }
    }


    public function backendLogin(Request $request)
    {
       
        try {
           

            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);


            if (Auth::attempt($credentials)) {
                $user = Auth::user();

                if(!hasPermissions())
                {
                  return response()->json(['Message' => 'Permsission not Found'], 403);
                }

                
                $userPermissions = hasPermissions();
               
              
                if ($user instanceof \App\Models\User) {
                    return response()->json([
                        'status' => true,
                        'message' => 'Successfully Logged In',
                        'token' => $user->createToken("Login Token")->plainTextToken,
                        'token_type' => 'bearer',
                        'user_profile' => $user,
                        'permissions' => $userPermissions
                    ], 200);
                }
            } else {

                response()->json([
                    'status' => false,
                    'message' => 'Email Or Password not matched',

                ], 401);
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }


    public function backendLogout(Request $request)
    {
        $user = request()->user();

        if ($user) {
            $user->currentAccessToken()->delete();

            response()->json([
                'status' => true,
                'message' => 'Successfully Logout'
            ], 200);
        } else {
            response()->json([
                'status' => true,
                'message' => 'No user Authenticated'
            ], 401);
        }
    }


    public function login(Request $request)
    {
        $credentials = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($credentials->fails()) {
            return response()->json(['errors' => $credentials->errors()], 422);
        }

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if ($user instanceof \App\Models\User) {
                return response()->json([
                    'status' => true,
                    'message' => 'Successfully Logged In',
                    'token' => $user->createToken("Login Token")->plainTextToken,
                    'token_type' => 'bearer',
                    'user_profile' => $user
                ], 200);
            }
        } else {

            response()->json([
                'status' => false,
                'message' => 'Email Or Password not matched',

            ], 401);
        }
    }

    public function logout(Request $request)
    {
        $user = request()->user();

        if ($user) {
            $user->currentAccessToken()->delete();

            response()->json([
                'status' => true,
                'message' => 'Successfully Logout'
            ], 200);
        } else {
            response()->json([
                'status' => true,
                'message' => 'No user Authenticated'
            ], 401);
        }
    }

    // user delete backend

   
}
