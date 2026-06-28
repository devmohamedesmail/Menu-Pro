
import { useTranslation } from 'react-i18next';
export default function ProductDescription({ meal }: any) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    return (
        <p className="text-muted-foreground text-xs line-clamp-2 flex-1 mb-3">
            {isRTL ? meal.description_ar : meal.description_en}
        </p>
    )
}
