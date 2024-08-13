<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = "products";

    protected $fillable = [

        'name',
        'SKU',
        'price',
        'image',
        'category_id',
        'discount_id',
        'quantity_id'
    ];
    use HasFactory;
}
