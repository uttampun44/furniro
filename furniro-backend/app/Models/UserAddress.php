<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAddress extends Model
{
    protected $table = "user_address";

    protected $fillable = [
        'address_line_one',
        'address_line_two',
        'city',
        'postal_code',
        'country',
        'telephone',
        'mobile',
        'user_id'
    ];

    use HasFactory;

   
      
}
