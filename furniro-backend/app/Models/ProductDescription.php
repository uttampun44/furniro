<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProductDescription extends Model
{
    use HasFactory;

    protected $tables = "product_descriptions";

    protected $fillable = [
        'description',
        'addition_images',
        'product_id'
    ];

    public function products():BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
