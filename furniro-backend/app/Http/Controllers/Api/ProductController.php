<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductDiscount;
use App\Models\ProductDiscountInventory;
use App\Models\ProductQuantity;
use Faker\Core\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
       $products = Product::join('product_discount_inventory_categories', 'products.id', '=', 'product_discount_inventory_categories.product_id')
       ->join('product_categories', 'product_discount_inventory_categories.product_categories_id', '=', 'product_categories.id')
       ->join('product_discounts', 'product_discount_inventory_categories.discount_id', '=', 'product_discounts.id')
       ->select('products.*', 'product_categories.*', 'product_discounts.*')->limit(1)
       ->get();

        /*  count of row same product*/    
       $productCount = Product::join('product_discount_inventory_categories', 'products.id', '=', 'product_discount_inventory_categories.product_id')
                       ->join('product_quantities', 'product_discount_inventory_categories.quantity_id', '=', 'product_quantities.id')
                       ->count();

        return response()->json([
            'products' => $products,
            'quantity' => $productCount
        ], 200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productCategory = ProductCategory::select('id','name')->get();

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
     
        // dd($request);

        DB::beginTransaction();

        try {

        //     $validation = validator($request->all(), [
        //         'name' => 'required|string',
        //         'sku' =>  'required|string',
        //         'price' => 'required|string',
        //         'product_image' => 'required',
               
        //   ]);
  
        //   if($validation->errors())
        //   {
        //        return response()->json([
        //          'errors' => $validation->errors()
        //        ], 422);

        //        Log::error($validation);
        //   }

   
            $imagePath = null;

          if($request->hasFile('product_image'))
          {
            $imagePath = $request->file('product_image');
            
            $imagePath = $imagePath->store('uploads', 'public'); 
          }
 

          $product = Product::create([
             'product_name' => $request->product_name,
             'sku' => $request->sku,
             'price' => $request->price,
             'product_image' => $imagePath,
              'short_description' => $request->short_description
          ]);


          $productDiscount = ProductDiscount::create([
            'discount_price' => $request->discount_price,
            'status' => $request->status,
        ]);

       
        /*  This reduces the number of database queries and can significantly improve performance.
         we can perform this without any loop
        */ 
       
        $productQuantity = ProductQuantity::create([
           'quantity' => $request->quantity
        ]);
        

        for ($i = 1; $i <= $productQuantity->quantity; $i++)  {
            ProductDiscountInventory::create([
                'product_categories_id' => $request->input('product_category_id'),
                'product_id' => $product->id,
                'quantity_id' => $productQuantity->id,
                'discount_id' => $productDiscount->id
              ]);
        }
         
        // dd($request);

          DB::commit();
          return response()->json([
             'message' => 'Product Create Successfully Created'
          ], 201);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
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
