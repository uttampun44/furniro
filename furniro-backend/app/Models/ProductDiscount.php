<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductDiscount extends Model
{
    protected $table = "product_discounts";
    protected $fillable = [
       'discount_price',
       'status'
    ];
    use HasFactory;

    
    public function productQuantities(): BelongsTo
    {
        return $this->belongsTo(ProductQuantity::class); 
    }
}
