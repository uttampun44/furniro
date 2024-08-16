<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductDiscount;
use App\Models\ProductQuantity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productCategory = ProductCategory::select('name')->get();

        if (!$productCategory) {
            return response()->json([
                'status' => false,
                'message' => 'product category not found',
            ], 500);
        }

        return response()->json([
            'status' => true,
            'product_category' => $productCategory
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       

        DB::beginTransaction();
        try {
            $validation = validator($request->all(), [
                'name' => 'required|string',
                'sku' =>  'required|string',
                'price' => 'required|string',
                'image' => 'required|file|image|mimes:jpeg,jpg|max:2048',
                'category_id' => 'required|number',
                'discount_price' => 'required|number',
                'quantity' => 'required|number'
          ]);
  
          if($validation->errors())
          {
               return response()->json([
                 'errors' => $validation->errors()
               ], 422);
          }


          $productDiscount = ProductDiscount::create([
              'discount_price' => $request->discount_price,
              'status' => $request->active,
          ]);

          $productQuantity = ProductQuantity::create([
             'quantity' => $request->quantity
          ]);

          $product = Product::create([
             'name' => $request->name,
             'sku' => $request->sku,
             'price' => $request->price,
             'image' => $request->image,
             'category_id' => $request->category_id,
             'discount_id' => $productDiscount->discount_price,
             'quantity_id' => $productQuantity->quantity
          ]);

          return response()->json([
             'message' => 'Product Create Successfully Created'
          ], 201);
        } catch (\Throwable $th) {
            $th->getMessage();
            DB::rollBack();

            return response()->json([
                'message' => 'Interval Error'  
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
