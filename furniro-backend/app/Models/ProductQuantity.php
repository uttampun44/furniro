<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductQuantity extends Model
{
    protected $table = "product_quantities";
    protected $fillable = [
      'quantity'
    ];

    use HasFactory;

    public function productsDiscounts():BelongsToMany
    {
      return $this->belongsToMany(ProductQuantity::class);
    }
   
}
