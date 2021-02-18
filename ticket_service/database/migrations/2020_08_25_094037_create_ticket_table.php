<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('ticket_id')->unique();
            $table->string('ticket_title')->nullable();
            $table->string('ticket_type_id')->nullable();
            $table->string('priority')->nullable();
            $table->string('description')->nullable();
            $table->datetime('schedule_date')->nullable();
            $table->string('study_status')->nullable();
            $table->string('order_id')->nullable();
            $table->string('order_name')->nullable();
            $table->string('order_phone')->nullable();
            $table->string('order_email')->nullable();
            $table->string('order_workplace')->nullable();
            $table->string('image_des')->nullable();
            $table->string('note')->nullable();
            $table->string('solution')->nullable();
            $table->string('advice')->nullable();
            $table->string('result_date')->nullable();
            $table->string('engineer_id')->nullable();
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
        Schema::dropIfExists('ticket');
    }
}
