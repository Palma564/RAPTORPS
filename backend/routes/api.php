<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CitaController;
use App\Http\Controllers\UserController;

Route::apiResource('users', App\Http\Controllers\Api\UserController::class);
Route::apiResource('citas', App\Http\Controllers\Api\CitaController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
