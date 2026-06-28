import React from 'react'
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Heart } from 'lucide-react';
import ProductGridCard from '@/components/product-card/product-grid-card';
import ProductListCard from '@/components/product-card/product-list-card';


export default function MealsSection({filteredMeals,mealsContainerRef,viewMode,country }: {
    filteredMeals: any[];
    mealsContainerRef:any
    viewMode:string
    country: any;
}) {
    const { t, i18n } = useTranslation();








    return (
      <div>
         {filteredMeals.length > 0 ? (
                            <div
                                ref={mealsContainerRef}
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                                        : 'flex flex-col gap-3'
                                }
                            >
                                {filteredMeals.map((meal:any) =>
                                    viewMode === 'grid' ? (
                                        
                                        <ProductGridCard key={meal.id} meal={meal} country={country} />
                                    ) : (
                                        
                                        <ProductListCard key={meal.id} meal={meal} country={country} />
                                    )
                                )}
                                
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                                <h3 className="font-semibold text-lg text-muted-foreground">{t('menu.no_items_found')}</h3>
                                <p className="text-sm text-muted-foreground/60 mt-1">{t('menu.adjust_filters')}</p>
                            </div>
                        )}
      </div>
    )
}
