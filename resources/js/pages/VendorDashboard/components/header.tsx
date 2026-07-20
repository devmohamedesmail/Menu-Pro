import React from 'react'
// @ts-ignore
declare var route: any;

import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Phone,
  Mail,
  Edit,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import ThemeToggle from '../../../components/ui/theme-toggle';
import LangToggle from '../../../components/ui/lang-toggle';
import AuthMenu from '../../../components/shared/auth-menu';
import useImport from '@/hooks/use-import';


function StoreBannerPlaceholder() {
  return (
    <svg className="w-full h-full opacity-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6h16v12H4z" />
    </svg>
  )
}
export default function Header({ store }: any) {
  const { t } = useImport();
  return (
    <div className="relative bg-white dark:bg-gray-800 border-b border-border shadow-sm">
      {/* Banner Background */}
      <div className="h-48 w-full relative overflow-hidden bg-gray-100 dark:bg-gray-700">
      
        {store.banner ? (
          <img
            src={store.banner}
            alt="Store Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <StoreBannerPlaceholder />

          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 pb-6">
        <div className="relative -mt-16 flex flex-col md:flex-row items-end md:items-center gap-6">
          {/* Store Logo */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-xl border-4 border-white dark:border-gray-800 shadow-lg bg-white overflow-hidden">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2">
              <Badge variant={store.is_active ? "default" : "destructive"} className="shadow-sm">
                {store.is_active ? t('common.active') : t('common.inactive')}
              </Badge>
            </div>
          </div>

          {/* Store Info */}
          <div className="flex-1 text-white md:text-gray-900 md:dark:text-white mb-2 md:mb-0 w-full">
            <h1 className="text-3xl font-bold drop-shadow-md md:drop-shadow-none">{store.name}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-200 md:text-gray-500 dark:text-gray-400 font-medium">
              {store.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{store.address}</span>
                </div>
              )}
              {store.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <span>{store.phone}</span>
                </div>
              )}
              {store.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  <span>{store.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions & User Menu */}
          
          <div className="flex items-center gap-3 self-center md:self-end mb-2 md:mb-6">
            <ThemeToggle />
            <LangToggle />
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link href={route('store.update.page', store.id)}>
                <Edit className="w-4 h-4 mr-2" />
                {t('dashboard.edit-details')}
              </Link>
            </Button>
            <Link 
            target='_blank'
            href={`/store/menu/page/with/qrcode/${store?.slug}/${Number(store?.id)}/table/`}><Share2 /></Link>

            {/* User Dropdown */}
          <AuthMenu />
          </div>
        </div>
      </div>
    </div>
  )
}
