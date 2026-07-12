import React from 'react'
import MealImage from './meal-image'
import MealPrice from './meal-price'
import MealTitle from './meal-title'
import MealDescription from './meal-description'
import MealAction from './meal-action'

export default function MealCardView({ meal, country }: any) {
  return (
    <div className='border'>
      <MealImage meal={meal}  />
      <div className='px-3'>
        <MealTitle meal={meal} />
        <MealDescription meal={meal} />
      </div>
      <div className='flex justify-between items-center px-3 py-3'>
        <MealPrice meal={meal} country={country} />
        <MealAction meal={meal} />
      </div>
    </div>
  )
}
