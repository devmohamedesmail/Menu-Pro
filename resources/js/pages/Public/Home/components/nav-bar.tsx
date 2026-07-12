import ThemeToggleIcon from '@/components/shared/theme-toggle-icon'
import MobileMenu from './mobile-navbar'
import Logo from '@/components/ui/logo'
import { usePage, Link, router } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LangToggleIcon from '@/components/shared/lang-toggle-icon'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance'
import { LogOut, LayoutDashboard, User } from 'lucide-react';

export default function NavBar() {
    const { t } = useTranslation()
    const { auth }: any = usePage().props;

    const handleLogout = () => {
        router.post('/logout');
    };
    return (
        <header className="sticky  top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50 shadow-sm">
            <div className="container m-auto flex justify-between items-center py-2 px-5">
                <Logo />
                <MobileMenu />




                <nav className="hidden md:flex flex-1 items-center justify-center gap-2">
                    <Link
                        href="/"
                        className="rounded-full px-5 py-2 text-sm lg:text-base font-medium text-gray-700 dark:text-gray-200 transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                        {t("landing.home")}
                    </Link>


                    <Link
                        href="/plans"
                        className="rounded-full px-5 py-2 text-sm lg:text-base font-medium text-gray-700 dark:text-gray-200 transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                        {t("landing.plans")}
                    </Link>

                    <Link
                        href="/contact-us"
                        className="rounded-full px-5 py-2 text-sm lg:text-base font-medium text-gray-700 dark:text-gray-200 transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                        {t("landing.contact-us")}
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggleIcon />
                        <LangToggleIcon />

                    
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {auth?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg hover:bg-accent/50 transition-all duration-200 outline-none">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold text-sm">
                                            {auth.user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="hidden sm:block text-left">
                                            <p className="text-sm font-medium text-foreground">{auth.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{t('header.my-account')}</p>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64 sm:w-72">
                                    {/* User Info Section */}
                                    <div className="p-4 border-b border-border bg-accent/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg">
                                                {auth.user.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-foreground truncate">{auth.user.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{auth.user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            <LayoutDashboard className="w-5 h-5 text-primary" />
                                            <span>{t('header.dashboard')}</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="w-5 h-5 text-primary" />
                                            <span>{t('header.profile')}</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
                                        <LogOut className="w-5 h-5" />
                                        <span>{t('auth.logout')}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-3 sm:px-4 py-2 rounded-lg border border-border hover:bg-accent/50 font-medium text-sm transition-colors duration-200"
                                >
                                    {t('auth.login')}
                                </Link>
                              
                            </>
                        )}
                    </div>
                </div>
            </div>

        </header>
    )
}
