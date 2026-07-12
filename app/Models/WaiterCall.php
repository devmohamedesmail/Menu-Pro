<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaiterCall extends Model
{
    /** @use HasFactory<\Database\Factories\WaiterCallFactory> */
    use HasFactory;

    protected $fillable = ['store_id', 'table_id' ,' type' ,'status','note','accepted_at','completed_at'];
    
}
