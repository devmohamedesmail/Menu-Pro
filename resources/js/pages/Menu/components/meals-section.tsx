import SectionTitle from '@/components/shared/section-title';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LayoutGrid, List } from 'lucide-react';
import MealCardView from './meal-card/meal-card-view';
import MealListView from './meal-card/meal-list-view';

type ViewMode = 'grid' | 'list';
export default function MealsSection({ meals, country, filterMeals }: any) {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  return (
    <div className='container mx-auto pb-44 my-5'>
      <SectionTitle title={t('common.browse-meals')} />
      <div className='flex justify-between items-center px-4 mb-5'>
        <h2>{t('menu.meals_count')} - {meals?.data?.length}</h2>



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

      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
          : 'flex flex-col gap-3'
      }>
        {filterMeals.length > 0 ? (<>{filterMeals.map((meal: any) => viewMode === 'grid' ? (<MealCardView key={meal.id} meal={meal} country={country} />) : (<MealListView key={meal.id} meal={meal} country={country} />))}</>):(<p>no meals</p>)}
        
      </div>
    </div>
  )
}
