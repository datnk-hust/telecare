<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaterialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('material_id')->unique();
            $table->string('material_name')->nullable();
            $table->string('model')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('import_date')->nullable();
            $table->integer('amount')->nullable();
            $table->string('unit')->nullable();
            $table->integer('used')->nullable();
            $table->string('note')->nullable();
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('material');
    }
}
