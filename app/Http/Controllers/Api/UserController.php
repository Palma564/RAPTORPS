<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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

    // GET /api/users/{user}
    public function show(User $user)
    {
        return response()->json($user, 200);
    }

    // PUT/PATCH /api/users/{user}
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users',
            'celular'     => ['nullable', 'digits:10', 'unique:users,celular'],
            'rol'         => 'nullable|string|max:255',
            'password'    => 'required|string|min:8|confirmed',
        ]);

        // Remueve la contraseña si no se envió una nueva
        if (array_key_exists('password', $data) && empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);

        return response()->json($user, 200);
    }

    // DELETE /api/users/{user}
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente'
        ], 200);
    }
}