<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDiscountInventory extends Model
{
    protected $table = "product_discount_inventory_categories";

    protected $fillable = [
      'product_categories_id',
      'product_id',
      'quantity_id',
      'discount_id'
    ];

    use HasFactory;
}
