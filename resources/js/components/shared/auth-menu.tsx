import React from 'react'
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  User,
  LogOut,
  UtensilsCrossed,
  ListFilter,
  ShoppingBag,
  LayoutGrid,
  MapPin,
  Phone,
  Mail,
  Edit,
  QrCode,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
      // @ts-ignore
declare var route: any;
export default function AuthMenu() {
    const { auth }: any = usePage().props;
    const { t } = useTranslation();
      const handleLogout = () => {
        router.post(route('logout'));
      };

    return (
    <div>
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {auth.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{auth.user.name}</p>
                    <p className="w-50 truncate text-sm text-muted-foreground">
                      {auth.user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={route('dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>{t('header.dashboard')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={route('vendor.profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{t('header.profile')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('auth.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
    </div>
  )
}
