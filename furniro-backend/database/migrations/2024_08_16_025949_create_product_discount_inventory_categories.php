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
        Schema::create('product_discount_inventory_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_categories_id')
            ->constrained('product_categories', 'id', 'prod_disc_inv_cat_prod_cat_id_fk')
            ->onUpdate('cascade')->onDelete('cascade');

      $table->foreignId('product_id')
            ->constrained('products', 'id', 'prod_disc_inv_cat_prod_id_fk')
            ->onUpdate('cascade')->onDelete('cascade');

      $table->foreignId('quantity_id')
            ->constrained('product_quantities', 'id', 'prod_disc_inv_cat_qty_id_fk')
            ->onUpdate('cascade')->onDelete('cascade'); 
            
      $table->foreignId('discount_id')
            ->constrained('product_discounts', 'id', 'prod_disc_inv_cat_disc_id_fk')
            ->onUpdate('cascade')->onDelete('cascade');   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_discount_inventory_categories');
    }
};
