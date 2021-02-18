<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $table = 'ticket';
    protected $fillable = [
            'ticket_id',
            'ticket_title',
            'ticket_type_id',
            'priority',
            'description',
            'schedule_date',
            'study_status',
            'order_id',
            'order_name',
            'order_phone',
            'order_email',
            'order_workplace',
            'image_des',
            'note',
            'solution',
            'advice',
            'result_date',
            'engineer_id',
            'observation_time',
            'effective_time',
            'discharge_time',
            'image_obs',
            'reason',
            'study_time'
    ];
}
