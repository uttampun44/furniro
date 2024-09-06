<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductQuantity extends Model
{
    protected $table = "product_quantities";
    protected $fillable = [
      'quantity'
    ];

    use HasFactory;

    public function products():BelongsToMany
    {
      return $this->belongsToMany(Product::class, 'product_discount_inventory_categories','quantity_id', 'product_id')->withPivot('discount_id');
    }
    public function productDiscount(): BelongsToMany
    {
        return $this->belongsToMany(ProductDiscount::class, 'product_discount_inventory_categories', 'discount_id', 'quantity_id')->withPivot('product_id'); 
    }
}
