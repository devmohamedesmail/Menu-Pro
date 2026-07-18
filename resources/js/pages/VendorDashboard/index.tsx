import React from 'react';
// @ts-ignore
declare var route: any;
import { Head } from '@inertiajs/react';
import { Tabs } from '@/components/ui/tabs';
import Header from '@/pages/VendorDashboard/components/header';
import TabsSection from '@/pages/VendorDashboard/components/tabs-section';
import OverviewTab from '@/pages/VendorDashboard/components/overview-tab';
import EditButton from '@/pages/VendorDashboard/components/edit-button';
import MealsTab from '../Products/components/meals-tab';
import CategoriesTab from '../Categories/components/categories-tab';
import OrdersTab from '../Orders/components/orders-tab';
import TableTab from '../Tables/components/table-tab';
import useImport from '@/hooks/use-import';


export default function Dashboard({ store, categories, meals, country, orders, tables, attributes, stats }: any) {
  const { t } = useImport();
  if (!store) return null;
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      <Head title={`${store.name} - ${t('header.dashboard')}`} />

      <Header store={store} />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full space-y-6">
          <div className="flex items-center justify-between pb-4 overflow-x-auto">
            <TabsSection store={store} />
            <EditButton />
          </div>

          <OverviewTab
            stats={stats}
            country={country}
            orders={orders}
          />
          <CategoriesTab
            categories={categories}
            country={country}
          />

          <MealsTab
            meals={meals}
            categories={categories}
            country={country}
            attributes={attributes}
          />
          <OrdersTab
            orders={orders}
            store={store}
          />

          <TableTab
            tables={tables}
            country={country}
          />
        </Tabs>
      </div>
    </div>

  );
}






