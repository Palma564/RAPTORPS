<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    protected $fillable = [
        'user_id', 
        'taller_id',
        'vehiculo_id',
        'servicio_id',
        'fecha',
        'desc_problema',
        'estado',
        'precio_final'
    ];
}
