import { Country, Meal } from '@/types/menu'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function MealPrice({ meal, country }: { meal: Meal, country: Country }) {
  const { t, i18n } = useTranslation()
  return (
    <div>

      {meal.sale_price ? <div className='flex items-center gap-2'>
        <p className='font-bold'>{meal.sale_price} {i18n.language === 'ar' ? country.currency_ar : country.currency_en}</p>
        <p className='text-red-600 line-through text-xs'>{meal.price} {i18n.language === 'ar' ? country.currency_ar : country.currency_en}</p>
      </div> : <p className='font-bold'>{meal.price} {i18n.language === 'ar' ? country.currency_ar : country.currency_en}</p>}
    </div>
  )
}
