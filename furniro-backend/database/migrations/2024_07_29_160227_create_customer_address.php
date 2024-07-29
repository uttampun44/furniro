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
        Schema::create('customer_address', function (Blueprint $table) {
            $table->id();
            $table->string('address_line_one');
            $table->string('address_line_two');
            $table->string('city');
            $table->string('postal_code');
            $table->string('country');
            $table->string('telephone')->nullable();
            $table->string('mobile')->nullable();
            $table->foreignId('user_id')->constrained()
                   ->onUpdate('cascade')
                   ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_address');
    }
};
