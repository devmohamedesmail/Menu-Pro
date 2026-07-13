import Header from '@/components/vendor/header'
import { Head } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next'
import OrderCard from './components/order-card';

export default function index({ store, orders }: any) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language == "ar";
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      <Head title={`${store.name} - ${t('header.dashboard')}`} />
      <Header store={store} />

      {/* {orders.map((order:any)=> <OrderCard order={order} isAr={isAr} /> )} */}
      <div className="container mx-auto px-5">
        {orders.map((order: any) => (
          <div className='border mb-4 shadow p-4'>
            <span>{t('dashboard.table')}: <strong>{order?.table ? order?.table  : "Delivery" }</strong></span>
            <div className="space-y-1.5">
              {order.order?.map((item: any, idx: any) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-secondary text-xs rounded-md flex items-center justify-center font-bold shrink-0">
                      {item.quantity}×
                    </span>
                    <span className="text-foreground">
                      {isAr ? item.name_ar : item.name_en}
                    </span>
                  </div>
                  <span className="font-medium text-primary shrink-0">
                    {order.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
