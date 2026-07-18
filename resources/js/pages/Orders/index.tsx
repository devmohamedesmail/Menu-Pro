import Header from '@/pages/VendorDashboard/components/header'
import { Head } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next'
import OrderCard from './components/order-card';
import { Separator } from '@/components/ui/separator';
import useImport from '@/hooks/use-import';
import { NotebookIcon } from 'lucide-react';

export default function index({ store, orders }: any) {

  const { t, isArabic } = useImport();
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      <Head title={`${store.name} - ${t('header.dashboard')}`} />
      {/* <Header store={store} /> */}

      {/* {orders.map((order:any)=> <OrderCard order={order} isAr={isAr} /> )} */}
      <div className="container mx-auto px-5 mt-10">
        {orders?.length > 0 ? <>
          {orders.map((order: any) => (
            <div className='border mb-4 shadow p-4'>
              {order.table ? <h5 className='mb-4'>{t('dashboard.table')}: <strong>{order?.table}</strong></h5> : <h5 className='mb-4'><strong>{t('orders.delivery-order')}</strong></h5>}

              <Separator />
              <div className='flex justify-between items-center mt-2'>
                <div className="space-y-1.5">
                  {order.order?.map((item: any, idx: any) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-10 h-10 bg-primary text-white text-xs rounded-md flex items-center justify-center font-bold shrink-0">
                          {item.quantity}
                        </span>
                        <span className="text-foreground">
                          {isArabic ? item.name_ar : item.name_en}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='w-10 h-10 bg-primary text-white flex items-center justify-center rounded-md'>
                  <h2 className=''>{order.total} </h2>
                </div>
              </div>
            </div>
          ))}

        </> : 
        <div className='flex flex-col items-center justify-center'>
          <NotebookIcon />
          <h3>{t('orders.no-orders-found')}</h3>
        </div>
        }
      </div>

    </div>
  )
}
