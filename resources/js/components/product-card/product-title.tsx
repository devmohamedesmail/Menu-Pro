
import { Meal } from '@/types/menu';
import { useTranslation } from 'react-i18next';

type Props={
    meal: Meal
}
export default function ProductTitle({ meal }: Props) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    return (
        <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors flex-1">
            {isRTL ? meal.name_ar : meal.name_en}
        </h3>
    )
}
