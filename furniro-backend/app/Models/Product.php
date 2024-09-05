<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = "products";

    protected $fillable = [

        'name',
        'sku',
        'price',
        'product_image',
        'short_description'
    ];
    use HasFactory;
}
