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
      'image',
      'gender', 
      'address',
      'city',
      'postal_code',
      'district',
      'telephone',
      'mobile'
    ];
    use HasFactory;

   
}
