<?php

use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SignupController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['api'])->group(function() {
    // Route::get('/user-dashboard', UserController::class);
    // Route::get('/dashboard', DashboardController::class);
});

Route::post('signup', SignupController::class);
Route::get('users', [UserController::class, 'index']);


