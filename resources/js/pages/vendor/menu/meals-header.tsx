import React from 'react'
import { LayoutGrid, List, ShoppingBag, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MealsHeader({selectedCategory,getCategoryName,categories,filteredMeals,setViewMode,viewMode}:any) {
    const {t}=useTranslation()
  return (
     <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 bg-primary rounded-full" />
                        <h2 className="font-bold text-lg">
                            {selectedCategory
                                ? getCategoryName(categories.find((c:any) => c.id === selectedCategory)!)
                                : t('menu.all_meals')}
                        </h2>
                        <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
                            {filteredMeals.length}
                        </span>
                    </div>

                    {/* Grid / List toggle */}
                    <div className="flex items-center bg-secondary rounded-xl p-1 gap-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            title={t('menu.grid_view')}
                            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            title={t('menu.list_view')}
                            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
  )
}
