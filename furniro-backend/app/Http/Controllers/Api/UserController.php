<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // user profile routes and details
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
    
    public function updateProfile(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [

        ]);

        if($validator->fails())
        {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user_details = UserDetail::findOrFail($id);
        $user_address = UserAddress::findOrFail($id);

        $image = $user_details->image;

         if($request->hasFile('image'))
         {
            if($image)
            {
                Session::delete();
            }
            $imageName = time().'.'.$image->extension();
            $request->image->move(public_path('uploads/images'), $imageName);
         }

         $user_details->image = $image;
         $user_address->address_line_one = $request->address_line_one;
         $user_address->address_line_two = $request->address_line_two;
         $user_address->city = $request->city;
         $user_address->postal_code = $request->postal_code;
         $user_address->country = $request->country;
         $user_address->telephone = $request->telephone;
         $user_address->mobile = $request->mobile;
         $user_address->user_id = Auth::user()->id;

        return response()->json([
           'success' => true,
           'user_details_image' => $user_details,
           'user_address_details' => $user_address 
        ], 200);
    }
}