<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class User extends Model
{
    protected $fillable = ['name', 'email', 'email_verified_at', 'celular', 'rol', 'password', 'remember_token', 'created_at', 'updated_at'];
}
