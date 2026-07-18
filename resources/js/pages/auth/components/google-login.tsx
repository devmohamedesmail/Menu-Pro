import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function GoogleLogin() {
 const {t}=useTranslation();
    return (
    <div>
        <Button className='bg-black w-full h-12'>
            {t('auth.google-login')}
            <LogIn />
        </Button>
    </div>
  )
}
