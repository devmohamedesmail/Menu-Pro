<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    /** @use HasFactory<\Database\Factories\AttributeFactory> */
    use HasFactory;



    public function attributeValues()
    {
        return $this->hasMany(AttributeValue::class);
    }


    public function meals()
    {
        return $this->belongsToMany(Meal::class, "meal_attributes");
    }
}
