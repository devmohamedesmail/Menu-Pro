import { Country, Meal } from '@/types/menu'
import { useTranslation } from 'react-i18next';
type Props = {
    meal: Meal,
    country: Country
}
export default function ProductPrice({ meal, country }: Props) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    return (
        <div className="flex flex-col items-end shrink-0">
            {meal.sale_price ? (
                <>
                    <span className="text-xs line-through text-muted-foreground">
                        {isRTL ? country?.currency_ar : country?.currency_en} {meal.price}
                    </span>
                    <span className="font-bold text-primary text-sm">
                        {isRTL ? country?.currency_ar : country?.currency_en} {meal.sale_price}
                    </span>
                </>
            ) : (
                <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-sm">
                    {isRTL ? country?.currency_ar : country?.currency_en} {meal.price}
                </span>
            )}
        </div>
    )
}
