<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDetail extends Model
{
    protected $table = 'user_details';
    
    protected $fillable = [
      'date_of_birth',
      'phone_details',
      'image',
      'gender', 
      'user_id'
    ];
    use HasFactory;

    public function user():BelongsTo
    {
      return $this->belongsTo(User::class);
    }
}
