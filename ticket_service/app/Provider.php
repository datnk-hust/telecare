<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    protected $table = 'provider';
    protected $fillable = [
        'provider_name',
        'address',
        'phone',
        'email',
        'note'
    ];
}
