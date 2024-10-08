<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $table = "roles";
    protected $fillable = [
        'role_name',
        'role_slug'
    ];

    use HasFactory;

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'role_users');
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'permission_roles');
    }
}
