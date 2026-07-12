import { Meal } from '@/types/menu'
import { useTranslation } from 'react-i18next'

export default function MealTitle({ meal }: { meal: Meal }) {
    const { t, i18n } = useTranslation()
    return (
        <div>
         
            <h5 className='font-bold text-lg'>{i18n.language === "ar" ? meal.name_ar : meal.name_en}</h5>
        </div>
    )
}
