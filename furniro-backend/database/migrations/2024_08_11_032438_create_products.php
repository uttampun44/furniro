<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('SKU');
            $table->decimal('price');
            $table->foreignId('category_id')->constrained('product_categories')
            ->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('discount_id')->constrained('product_discounts')
            ->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('quantity_id')->constrained('product_quantities')
            ->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
