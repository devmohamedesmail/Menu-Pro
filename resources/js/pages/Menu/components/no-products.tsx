import { UtensilsCrossed } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function NoProducts() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center w-full">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                <UtensilsCrossed className="h-10 w-10 text-orange-500" />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                {t('menu.no_products_found')}
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                {t('menu.no_products_found_description')}
            </p>
        </div>
    )
}
