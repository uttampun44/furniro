<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductCategoryController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::get('profile', [UserController::class, 'index']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('backendlogout', [AuthController::class, 'backendLogout']);
});
Route::put('update-profile/{id}', [UserController::class, 'updateProfile']);
Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
Route::post('backendlogin', [AuthController::class, 'backendLogin']);

/**************** product category Route*****************************/ 
Route::get('product-category-list', [ProductCategoryController::class, 'index']);
Route::post('product-categories', [ProductCategoryController::class, 'store']);
Route::get('product-categories/edit/{id}', [ProductCategoryController::class, 'edit']);
Route::put('product-categories/update/{id}', [ProductCategoryController::class, 'update']);
Route::delete('product-categies/{id}', [ProductCategoryController::class, 'destroy']);









