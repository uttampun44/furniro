<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\Request;

class SignupController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
           'title' => 'required',
           'body' => 'required'   
        ]);

       $user =  User::create([
           'name' => $request->input('fullname'),
           'email' => $request->input('email'),
           'password' => $request->input('password')
        ]);

        UserAddress::create([
           'full_name' => $user->name,
           'email' => $user->email,
           'date_of_birth' => $request->input('date_of_birth'),
           'phone_details' => $request->input('phone_details'),
           'gender' => $request->input('gender'),
           'user_id' => $user->id
        ]);
     
        
    }
}
