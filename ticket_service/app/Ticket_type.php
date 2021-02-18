<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket_type extends Model
{
    protected $table = 'ticket_type';
    protected $fillable = [
        'ticket_name','note'
    ];
}
