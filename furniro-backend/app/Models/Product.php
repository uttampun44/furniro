<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $table = "products";

    protected $fillable = [

        'product_name',
        'sku',
        'price',
        'product_image',
        'short_description'
    ];
    use HasFactory;

  
    
    public function discounts():BelongsToMany
    {
        return $this->belongsToMany(ProductDiscount::class, 'product_discount_inventory_categories', 'product_id', 'discount_id');
    }


    public function quantities() :BelongsToMany
    {
        return $this->belongsToMany(ProductQuantity::class, 'product_discount_inventory_categories', 'product_id', 'quantity_id');
    }

  
}
