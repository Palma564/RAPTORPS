<?php
 
namespace App\Http\Controllers\Api;
 
use App\Models\User;
use Illuminate\Http\Request;
 
class UserController 
{
    // GET /api/users
    public function index()
    {
        return response()->json(User::latest()->get(), 200);
    }
 
    // POST /api/users
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users',
            'celular'     => ['nullable', 'digits:10', 'unique:users,celular'],
            'rol'         => 'nullable|string|max:255',
            'password'    => 'required|string|min:8|confirmed',
        ]);
 
        $user = User::create($data);
 
        return response()->json($user, 201);
    }
}