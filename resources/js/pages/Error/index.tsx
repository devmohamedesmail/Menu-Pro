import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'
import { router } from '@inertiajs/react'
import React from 'react'
import { MdError } from 'react-icons/md'

export default function Error({ status, message }: any) {
  const {t}=useImport()
  return (
    <div className='h-screen  flex flex-col items-center justify-center container mx-auto'>
      <div className='flex flex-col items-center justify-center '>
        <MdError size={100} color="red" />
        <h3 className='text-4xl'>{status}</h3>
        <h3 className='text-4xl'>{t("common.page-error")}</h3>
        <h3>{message}</h3>
        <Button onClick={()=>window.history.back()} className='mt-10'>{t('common.go-back')}</Button>
      </div>
    </div>
  )
}
