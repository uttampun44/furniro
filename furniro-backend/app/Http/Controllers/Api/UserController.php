<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    // user routes and details backend
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
           
        } else {
            $user_profile = UserDetail::with('user')->get();
        }
        return response()->json([
            'user_profile' => $user_profile,
        ]);
    }

    

    public function updateProfile(Request $request, $id)
    {

        DB::beginTransaction();
        try {

            if ($id) {
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

                // $user_address = UserAddress::updateOrCreate(
                //     ['user_id' => $id],
                //     [
                //         'address_line_one' => $request->address_line_one,
                //         'address_line_two' => $request->address_line_two,
                //         'city' => $request->city,
                //         'postal_code' => $request->postal_code,
                //         'country' => $request->country,
                //         'telephone' => $request->telephone,
                //         'mobile' => $request->mobile,
                //     ]
                // );
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'user_details_image' => $user_details,
                'message' => 'Profile Updated Successfully'
            ], 200);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Profile Update Failed'
            ], 500);
        }
    }

    // fetch roles in backend and exclude customer role
    public function fetchRoles()
    {
        $roles = Role::whereNotIn('role_name', ['Customer'])->get();
        
        if ($roles) {

            return response()->json([
                'success' => true,
                'message' => 'Roles Fetched Successfully',
                'roles' => $roles,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Roles not found',
            ], 500);
        }
    }

    public function editUser($id)

    {
        
        $user = User::with('roles')->find($id);


        return response()->json([
               'status' => true,
               'Single User Data' => $user,              
               'Message' => "Single User Data"
        ], 200);

    }

// delete user function from backend
    public function deleteUser($id)
    {
        try {
           $deleteUser = User::findOrFail($id);

        if($deleteUser)
        {
            $deleteUser->delete();

            return response()->json([
               'success' => true,
               'Message' => 'User Delete Successfully'
            ], 200);
        }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return response()->json([
                   'status' => false,
                   'Message' => 'Internal Server Error'
            ], 500);
        }
    }
}
