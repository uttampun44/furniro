<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $table = 'user_details';
    
    protected $fillable = [
      'full_name',
      'email',
      'date_of_birth',
      'phone_details',
      'gender', 
      'user_id'
    ];

    use HasFactory;
}
