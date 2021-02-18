<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $table = 'material';
    protected $fillable = [
        'material_id',
        'material_name',
        'model',
        'provider_id',
        'import_date',
        'amount',
        'unit',
        'used',
        'note'
    ];
}
