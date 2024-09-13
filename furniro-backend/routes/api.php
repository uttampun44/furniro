<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FrontProductController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\ProductCategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductDescriptionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
  
    Route::get('profile', [UserController::class, 'index']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('backendlogout', [AuthController::class, 'backendLogout']);   
});



Route::put('update-profile/{id}', [UserController::class, 'updateProfile']);
Route::post('/backend/signup', [AuthController::class, 'backendSignup']);
Route::post('login', [AuthController::class, 'login']);
Route::post('backendlogin', [AuthController::class, 'backendLogin']);

/**************** product category Route*****************************/ 
Route::get('product-category-list', [ProductCategoryController::class, 'index']);
Route::post('product-categories', [ProductCategoryController::class, 'store']);
Route::get('product-categories/edit/{id}', [ProductCategoryController::class, 'edit']);
Route::put('product-categories/update/{id}', [ProductCategoryController::class, 'update']);
Route::delete('product-categies/{id}', [ProductCategoryController::class, 'destroy']);


/***************** Roles *************************/ 
Route::prefix('roles')->group( function(){
    Route::get('index', [RoleController::class, 'index']);
    Route::post('store', [RoleController::class, 'store']);
    Route::get('edit/{id}', [RoleController::class, 'edit']);
    Route::put('update/{id}', [RoleController::class, 'update']);
    Route::delete('delete/{id}', [RoleController::class, 'delete']);
});


Route::prefix('permission')->group( function(){
  Route::get('index', [PermissionController::class, 'index']);
  Route::post('store', [PermissionController::class, 'store']);
  Route::get('edit/{id}', [PermissionController::class, 'edit']);
  Route::put('edit/{id}', [PermissionController::class, 'update']);
  Route::delete('delete/{id}', [PermissionController::class, 'destroy']);
});

//  users
Route::prefix('user')->group(function(){
  Route::get('user-roles', [UserController::class, 'fetchRoles']);
  Route::post('user-store', [AuthController::class, 'backendSignup']);
  Route::get('edit/{id}', [UserController::class, 'editUser']);
  Route::delete('delete/{id}', [UserController::class, 'deleteUser']);
});


// products
Route::prefix('products')->group( function(){
   Route::get('create', [ProductController::class, 'create']);
   Route::post('store', [ProductController::class, 'store']);
   Route::get('index', [ProductController::class, 'index']);
});

// products additional
Route::prefix('addition/')->group( function(){
  Route::get('index', [ProductDescriptionController::class, 'index']);
  Route::post('store', [ProductDescriptionController::class, 'store']);
})

/****************front page products ******************/;
Route::get('front/products', [FrontProductController::class, '__invoke']); 




