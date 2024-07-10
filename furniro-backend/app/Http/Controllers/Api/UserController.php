<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
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

        DB::beginTransaction();
        try {
                $user_details = UserDetail::findOrFail($id);

                $image = $user_details->image;

                if ($request->hasFile('image')) {
                    if ($image) {
                        Storage::delete($image);
                    }
                    $image = $request->file('image')->store('uploads');
                }

                $user_details->image = $image;
                $user_details->save();
              
                $user_address = UserAddress::where('user_id', $id)->first();
    

               if(!$user_address)
               {
                UserAddress::Create([
                    "address_line_one" => $request->address_line_one,
                    "address_line_two" => $request->address_line_two,
                    "city" => $request->city,
                    "postal_code" => $request->postal_code,
                    "country" => $request->country,
                    "telephone" => $request->telephone,
                    "mobile" => $request->mobile,
                    "user_id" => Auth::user()->id,
                ]);
               }else
               {

                $user_address = new UserAddress();
                $user_address->address_line_one = $request->address_line_one;
                $user_address->address_line_two = $request->address_line_two;
                $user_address->city = $request->city;
                $user_address->postal_code = $request->postal_code;
                $user_address->country = $request->country;
                $user_address->telephone = $request->telephone;
                $user_address->mobile = $request->mobile;
                $user_address->user_id = Auth::user()->id;

                $user_address->save();
               }

            return response()->json([
                'success' => true,
                'user_details_image' => $user_details,
                'user_address_details' => $user_address,
                'message' => 'Profile Updated Successfully'
            ], 200);

            DB::commit();
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Profile Update Failed'
            ], 500);
        }
    }
}
