<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
 
class Ticket_material extends Model
{
    protected $table = 'ticket_material';
    protected $fillable = [
        'ticket_id',
        'material_id',
        'amount',
        'supply_date',
        'note',
        'status',
        'approver'
    ];
}
