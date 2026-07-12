import { Meal } from '@/types/menu'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function MealDescription({meal}:{meal:Meal}) {
  const {t,i18n}=useTranslation()
  return (
    <div>{i18n.language === "ar" ? meal.description_ar : meal.description_en}</div>
  )
}
