<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductQuantity extends Model
{
    protected $table = "product_quantities";
    protected $fillable = [
      'quantity'
    ];

    use HasFactory;
}
