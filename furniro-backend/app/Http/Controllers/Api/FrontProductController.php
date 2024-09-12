<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontProductController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $products = Product::join('product_discount_inventory_categories', 'products.id', '=', 'product_discount_inventory_categories.product_id')
                    ->join('product_categories', 'product_discount_inventory_categories.product_categories_id', '=', 'product_categories.id')            
                    ->join('product_discounts', 'product_discount_inventory_categories.discount_id', '=', 'product_discounts.id')
                    ->join('product_quantities', 'product_discount_inventory_categories.quantity_id', '=', 'product_quantities.id')
                    ->select('products.product_name',  'products.price', 'products.short_description', 'products.product_image', 'products.sku', 'product_discounts.discount_price', 'product_categories.name')
                    ->groupBy('products.product_name',  'products.price', 'products.short_description', 'products.product_image', 'products.sku', 'product_discounts.discount_price', 'product_categories.name')
                    ->get();

        return response()->json([
            'products' => $products
        ], 200);            
    }
}
