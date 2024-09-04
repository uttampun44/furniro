<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDiscount extends Model
{
    protected $table = "product_discounts";
    protected $fillable = [
       'discount_price',
       'status'
    ];
    use HasFactory;
}
