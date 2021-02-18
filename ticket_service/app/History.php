<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $table = 'history';

    protected $fillable = [
        'ticket_id',
        'status',
        'content',
        'time',
        'support_id',
        'note'
    ];
}
