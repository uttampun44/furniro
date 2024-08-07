<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    protected $table = "permissions";
    protected $fillable = [
       'permission_name',
       'permission_slug' 
    ];
    use HasFactory;

    
    public function roles():BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_users');
    }

    // public function permissions():BelongsToMany
    // {
    //     return $this->belongsToMany(Permission::class, 'permission_roles');
    // }
}
