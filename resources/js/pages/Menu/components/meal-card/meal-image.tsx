import { Meal } from '@/types/menu'
import React from 'react'

interface MealImageProps {
  meal: Meal;
  width?: string;
  height?: string

}
export default function MealImage({ meal, width = 'w-full', height = 'h-44' }: MealImageProps) {
  return (
    <div>
      {meal.image ? <img src={meal?.image} className={`${width} ${height} object-cover`} alt={meal.name_ar} /> : <div className={`${width} ${height} border`}></div>}
    </div>
  )
}
