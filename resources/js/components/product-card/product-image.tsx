import React from 'react'
import { ShoppingBag, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProductImage({meal,hasAttributes}:any) {
      const { t, i18n } = useTranslation();
     const isRTL = i18n.language === 'ar';
  return (
     <div className="relative h-44 overflow-hidden bg-secondary">
                    {meal.image ? (
                        <img
                            src={meal.image}
                            alt={isRTL ? meal.name_ar : meal.name_en}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                            <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                    )}
                    {(meal.sale_price || meal.is_popular) && (
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {meal.sale_price && (
                                <span className="bg-destructive  text-xs font-bold px-2 py-0.5 rounded-full text-white">
                                    {t('menu.sale')}
                                </span>
                            )}
                            {meal.is_popular ? (
                                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-white" /> {t('menu.popular')}
                                </span>
                            ) : null}
                        </div>
                    )}
                    {/* Attributes badge */}
                    {hasAttributes && (
                        <span className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {t('menu.customizable')}
                        </span>
                    )}
                </div>
  )
}
