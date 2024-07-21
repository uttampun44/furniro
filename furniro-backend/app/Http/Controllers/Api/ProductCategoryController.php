<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    public function index()
    {
        try {
            $productCategory = ProductCategory::all();

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

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'image' => 'required'
            ]);

            if($validator->fails())
            {
                return response()->json(['errors' => $validator->errors()], 422);
            }
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
                'message' => $products,
               
            ], 200);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }

    public function edit($id)
    {
        try {
            $productCategoryEdit = ProductCategory::findOrFail($id);

        return response()->json([
           'status' => true,
           'productCategory' => $productCategoryEdit
        ], 200);

        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return response()->json([
                'status' => false,
                'productCategory' => 'Product category not found'
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $productCategoryUpdate = ProductCategory::findOrFail($id);
    
            $image = $productCategoryUpdate->image;
    
            if ($request->hasFile('image')) {
                if ($image) {
                    // Remove the old image if exists
                    if (file_exists(public_path($image))) {
                        unlink(public_path($image));
                    }
                }
    
                // Upload the new image
                $imagePath = $request->file('image');
                $extension = $imagePath->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $imagePath->move('uploads', $filename);
                $image = 'uploads/' . $filename;
            }
    
            // Update the product category
            $productCategoryUpdate->name = $request->input('name');
            $productCategoryUpdate->image = $image;
            $productCategoryUpdate->slug = Str::slug($request->input('name'));
    
            $productCategoryUpdate->save();
    
            return response()->json([
                'status' => true,
                'message' => 'Product Category Successfully Updated'
            ], 200);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
    
            return response()->json([
                'status' => false,
                'message' => 'Product Category Cannot Update'
            ], 500);
        }
    }
    

    public function destroy($id)
    {

       try {
        $productCategory = ProductCategory::findOrFail($id);

        if($productCategory)
        {
            $productCategory->delete();

            return response()->json([
                  "status" =>  true,
                  'message' => "Product Deleted"
            ], 200);
        }
       } catch (\Throwable $th) {
         Log::error($th->getMessage());

         return response()->json([
                  "status" => false,
                  "message" => "Product not Deleted"
         ], 500);
       }

    }
}
