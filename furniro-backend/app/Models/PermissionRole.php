<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionRole extends Model
{

    protected $table = 'permission_roles';
    
    protected $fillable = [
        'permission_id',
        'role_id'
    ];
    use HasFactory;
}
