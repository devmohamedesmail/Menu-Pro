<?php

namespace App\Models;

use App\Models\Product;
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


    public function products()
    {
        return $this->belongsToMany(Product::class, "product_attributes");
    }
}
