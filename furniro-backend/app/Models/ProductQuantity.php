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

    public function product(): BelongsToMany
    {
        return $this->belongsToMany(ProductDiscount::class, 'product_discount_inventory_categories'); 
    }
}
