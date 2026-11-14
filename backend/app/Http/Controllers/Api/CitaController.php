<?php

namespace App\Http\Controllers\Api;

use App\Models\Cita;
use Illuminate\Http\Request;

class CitaController
{
    // GET /api/citas
    public function index()
    {
        return response()->json(Cita::latest()->get(), 200);
    }

    // POST /api/citas
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'       => 'required|integer',
            'taller_id'     => 'required|integer',
            'vehiculo_id'   => 'required|integer',
            'servicio_id'   => 'required|integer',
            'fecha'         => 'required|date',
            'desc_problema' => 'nullable|string',
            'estado'        => 'required|in:pendiente,confirmada,completada,cancelada',
            'precio_final'  => 'nullable|numeric|min:0',
        ]);

        $cita = Cita::create($data);

        return response()->json($cita, 201);
    }

    // GET /api/citas/{cita}
    public function show(Cita $cita)
    {
        return response()->json($cita, 200);
    }

    // PUT /api/citas/{cita}
    public function update(Request $request, Cita $cita)
    {
        $data = $request->validate([
            'user_id'       => 'sometimes|required|integer',
            'taller_id'     => 'sometimes|required|integer',
            'vehiculo_id'   => 'sometimes|required|integer',
            'servicio_id'   => 'sometimes|required|integer',
            'fecha'         => 'sometimes|required|date',
            'desc_problema' => 'nullable|string',
            'estado'        => 'sometimes|required|in:pendiente,confirmada,completada,cancelada',
            'precio_final'  => 'nullable|numeric|min:0',
        ]);

        $cita->update($data);

        return response()->json($cita, 200);
    }

    // DELETE /api/citas/{cita}
    public function destroy(Cita $cita)
    {
        $cita->delete();

        return response()->json([
            'message' => 'Cita eliminada correctamente'
        ], 200);
    }
}