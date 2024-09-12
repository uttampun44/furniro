<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDescription extends Model
{
    use HasFactory;

    protected $tables = "product_description";

    protected $fillable = [
        'description',
        'additional_images',
        'product_id'
    ];
}
