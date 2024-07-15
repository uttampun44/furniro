<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    public function index()
    {
        try {
            $productCategory = ProductCategory::all();

            // dd($productCategory);

            return response()->json([
                'status' => true,
                'product_category' => $productCategory,
            ], 200);

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {

            // $validator = Validator::make($request->all(), [
            //     'name' => 'required|string|max:255',
            //     'image' => 'required'
            // ]);

            // if($validator->fails())
            // {
            //     return response()->json(['errors' => $validator->errors()], 422);
            // }
            $imagePath = null;


             if ($request->hasFile('image')) {
            
                $imagePath = $request->file('image');
        
               
                $extension = $imagePath->getClientOriginalExtension();
        
                $filename = time() . '.' . $extension;
        
                $imagePath->move('uploads', $filename);

                $imagePath = 'uploads/' .$filename;
            }

            $products = ProductCategory::create([
                'name' => $request->name,
                'image' => $imagePath,
                'slug' => Str::slug($request->name)
            ]);

            response()->json([
                'status' => true,
                'message' => $products
            ], 200);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }
}
