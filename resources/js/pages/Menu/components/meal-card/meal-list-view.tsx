import React from 'react'
import MealImage from './meal-image'
import MealTitle from './meal-title'
import MealDescription from './meal-description'
import MealPrice from './meal-price'
import MealAction from './meal-action'

export default function MealListView({ meal,country }: any) {
  return (
    <div className='flex flex-row w-full border'>
      <MealImage meal={meal} width='w-44' height='h-28' />
      <div className='w-full'>
        <MealTitle meal={meal} />
        <MealDescription meal={meal} />
        <div className='flex flex-row justify-between w-full px-4 my-3'>
          <MealPrice meal={meal} country={country} />
          <MealAction meal={meal} />
        </div>
      </div>
    </div>
  )
}
