<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductDescription;
use App\Models\ProductDiscount;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductDescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productDescription = ProductDescription::with(['products' => function ($query) {
            $query->select('id', 'product_name');
        }])->select('id','description', 'addition_images', 'product_id')->get();

        return response()->json([
            'product_description' => $productDescription
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::select('id', 'product_name')->get();

        return response()->json([
            'products' => $products
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {


            $images = [];
            if ($request->hasFile('addition_images')) {

                $files = $request->file('addition_images');


                /*---------------inserting multiple images--------------*/
                foreach ($files as $image) {

                    // dd($image);
                    $path =   $image->store('uploads', 'public');

                    $images[] = $path;
                }

                ProductDescription::create([
                    'description' => $request->description,
                    'addition_images' => json_encode($images),
                    'product_id' => $request->input('product_id')
                ]);
            }
            return response()->json([
                'productDescription' => 'product description created successfully',
                'status' => true
            ], 201);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return response()->json([
                'message' => 'internal server error'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductDiscount $productDiscount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductDiscount $productDiscount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductDiscount $productDiscount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $delete = ProductDescription::findOrFail($id);

            if ($delete) {
                $delete->delete();

                return response()->json([
                    'message' => 'product deleted'
                ], 200);
            }
        }catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Product not found'
            ], 404); 
        }
        catch (\Throwable $th) {
            Log::error($th->getMessage());

            return response()->json([
                'message' => 'product deleted'
            ], 500);
        }
    }
}
