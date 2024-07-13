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
    }

    public function store(Request $request)
    {
        try {

            $imagePath = null;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->storeAs('uploads', $request->file('image')
                ->getClientOriginalName());
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
