import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, UtensilsCrossed, ListFilter, ShoppingBag, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import { Store } from '@/types/menu';
import useImport from '@/hooks/use-import';
import useSelectedStore from '@/hooks/use-selected-store';
export default function TabsSection({ store }: { store: Store }) {
    const { t } = useImport();
    const { getCurrentStore } = useSelectedStore();
    const currentStore = getCurrentStore();
    return (
        <TabsList className="bg-white dark:bg-gray-800 p-1 border border-border shadow-sm rounded-lg h-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                {t('dashboard.overview')}
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <ListFilter className="w-4 h-4 mr-2" />
                {t('dashboard.categories')}
            </TabsTrigger>
            <TabsTrigger value="meals" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                {t('dashboard.meals')}
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t('dashboard.orders')}
            </TabsTrigger>
            <TabsTrigger value="tables" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <LayoutGrid className="w-4 h-4 mr-2" />
                {t('dashboard.tables')}
            </TabsTrigger>

            <TabsTrigger
                value="#"
                onClick={() => router.get(`/orders/store/page/${currentStore.id}`)}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <LayoutGrid className="w-4 h-4 mr-2" />
                {t('dashboard.orders')}
            </TabsTrigger>
        </TabsList>
    )
}
