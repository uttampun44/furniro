<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RoleUser extends Model
{
    protected $table = 'role_users';
    protected $fillable = [
    'role_id',
    'user_id',
    ];
    use HasFactory;

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_id');
    }
    public function role():BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_id');
    }
}
