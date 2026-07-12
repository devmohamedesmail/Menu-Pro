import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { ShoppingBag, ChevronRight, ShoppingBagIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CartItem from './cart-item';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CartSheet({ isOpenSheet, setIsOpenSheet, totalItems, totalPrice, handleSendOrder, country }: any) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const cart = useSelector((state: any) => state.cart.meals || []);



  return (
    <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
      <SheetTrigger asChild>
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 cursor-pointer">
          <div
            className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-between backdrop-blur-md bg-opacity-95 border border-primary/20 max-w-md mx-auto hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-white">
                  {totalItems} {t('menu.items')}
                </span>
                <span className="text-sm font-medium text-white">
                  {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center text-white gap-1 font-bold bg-white/20 px-4 py-2 rounded-xl text-sm">
              {t('menu.view_order')}
              <ChevronRight className={`w-4 h-4 ml-1 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[85vh] rounded-t-4xl p-0 flex flex-col bg-background/95 backdrop-blur-xl border-t border-border/50">
       {cart.length > 0 ? (<>
       
        <SheetHeader className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold flex items-center gap-2 mt-5">
              <ShoppingBag className="w-6 h-6 text-primary" />
              {t('menu.your_order')}
            </SheetTitle>

          </div>
          <SheetClose asChild >


          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.map((item: any) => (
            <CartItem key={item.id} item={item} country={country} />

          ))}
        </div>

        <div className="p-6 bg-background border-t border-border/50 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>{t('menu.subtotal')}</span>
              <span>{totalPrice.toFixed(2)} {i18n.language ==="ar" ? country.currency_ar : country.currency_en} </span>
            </div>
            <Separator />


            <div className="flex justify-between text-xl font-bold">
              <span>{t('menu.total')}</span>
              <span className="text-primary">{totalPrice.toFixed(2)} {i18n.language ==="ar" ? country.currency_ar : country.currency_en}</span>
            </div>
          </div>


          <Button
            onClick={() => handleSendOrder()}
            // disabled={isSending}
            className="w-full py-6 text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            {/* {isSending ? t('common.saving') : t('menu.send_order')} */}
            {t('menu.send_order')}
          </Button>
        </div>
       
       
       </>):(<div className='flex flex-col items-center justify-center h-full'>
            <ShoppingBagIcon className='text-primary' size={100} />
            <h4 className='text-lg font-bold'>{t('menu.cart_empty')}</h4>

       </div>)}
      </SheetContent>
    </Sheet>
  )
}
