
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { Country, Store } from '@/types/menu';
import { Head, router } from '@inertiajs/react'
import CartSheet from './cart-sheet';
import { useFormik, validateYupSchema } from 'formik';
import DeliveryDialog from './delivery-dialog';
import toast from 'react-hot-toast';
import * as Yup from 'yup'


declare function route(name: string, params?: any): string
export default function CartSection({ store, table, country }: { store: any, table: string, country: Country }) {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.meals || []);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false)


  const getItemPrice = (item: any) => {
    if (item.selected_attributes && Object.keys(item.selected_attributes).length > 0) {
      return Object.values(item.selected_attributes).reduce(
        (sum: number, attr: any) => sum + (parseFloat(attr.price) || 0),
        0
      );
    }
    return parseFloat(item.sale_price || item.price || 0);
  };
  const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc: number, item: any) => {
    return acc + (getItemPrice(item) * item.quantity);
  }, 0);

const validationSchema = Yup.object({
  name:Yup.string().required(t('validation.is-required')),
  phone:Yup.string().required(t('validation.is-required')),
  address:Yup.string().required(t('validation.is-required')),
}) 
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: '',
      location: '',
      note: ''
    },
    validationSchema,
    onSubmit: () => {
      router.post(route('store.create.order'), { ...formik.values, cart, store }, {
        onSuccess: () => {
          setShowDeliveryDialog(false)
          toast.success(t('menu.order-sent-success'))
          formik.resetForm()
        },
        onError: () => {
          toast.success(t('menu.order-sent-failed'))
        }
      })
    }
  })
  const handleSendOrder = () => {
    if(table){
        alert(table)
    }else{
       setIsOpenSheet(false)
       setShowDeliveryDialog(true)
    }
  }


  return (
    <div>


      <CartSheet
        isOpenSheet={isOpenSheet}
        setIsOpenSheet={setIsOpenSheet}
        totalItems={totalItems}
        totalPrice={totalPrice}
        handleSendOrder={handleSendOrder}
        country={country}
      />





      <DeliveryDialog
        showDeliveryDialog={showDeliveryDialog}
        setShowDeliveryDialog={setShowDeliveryDialog}
        isRTL={isRTL}
        t={t}
        formik={formik}
        
      />
    </div>
  )
}
