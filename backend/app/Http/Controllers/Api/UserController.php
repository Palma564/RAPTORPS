<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'name' => 'required|string|max:255',

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')
            ],

            'celular' => [
                'nullable',
                'digits:10',
                Rule::unique('users', 'celular')
            ],

            'rol' => 'nullable|string|max:255',

            'password' => 'required|string|min:8|confirmed',
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json($user, 201);
    }

    // GET /api/users/{user}
    public function show(User $user)
    {
        return response()->json($user, 200);
    }

    // PUT /api/users/{user}
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id)
            ],

            'celular' => [
                'nullable',
                'digits:10',
                Rule::unique('users', 'celular')->ignore($user->id)
            ],

            'rol' => 'nullable|string|max:255',

            'password' => 'sometimes|nullable|string|min:8|confirmed',
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
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