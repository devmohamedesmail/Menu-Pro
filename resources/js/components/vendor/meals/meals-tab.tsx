import React, { useState } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, UtensilsCrossed } from 'lucide-react'
import EmptyState from '../empty-state'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import MealDialog from '@/components/vendor/meals/meal-dialog'
import { router } from '@inertiajs/react'
import MealCard from './meal-card'


interface Meal {
  id: number
  name_en: string
  name_ar: string
  description_en?: string
  description_ar?: string
  image: string
  price: number
  sale_price?: number
  category: {
    id: number
    name_en: string
    name_ar: string
  }
}



declare function route(name: string, params?: any): string
export default function MealsTab({ meals, categories, country, attributes }: any) {
  const { t, i18n } = useTranslation()
  const [mealDialogOpen, setMealDialogOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | undefined>()
  const isArabic = i18n.language === 'ar'


  const handleDeleteMeal = (id: number) => {
    if (confirm(t('confirm-delete-meal'))) {
      router.delete(route('store.meal.delete', id))
    }
  }



  return (
    <TabsContent value="meals">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('dashboard.meals')}</CardTitle>
            <CardDescription>{t('dashboard.manage-meals')}</CardDescription>
            <p> {meals?.length} </p>
          </div>
          <Button onClick={() => setMealDialogOpen(true)}>
            <UtensilsCrossed className="w-4 h-4 mr-2" />
            {t('dashboard.add-new-meal')}
          </Button>
        </CardHeader>
        <CardContent>
          {meals?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {meals.map((meal: any) => (
                <MealCard
                  meal={meal}
                  country={country}
                  setEditingMeal={setEditingMeal}
                  setMealDialogOpen={setMealDialogOpen}
                  handleDeleteMeal={handleDeleteMeal}
                  attributes={attributes}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<UtensilsCrossed className="w-12 h-12" />}
              title={t('dashboard.no-meals')}
              description={t('dashboard.create-first-meal')}
              actionText={t('dashboard.add-new-meal')}
            />
          )}
        </CardContent>
      </Card>



      <MealDialog
        open={mealDialogOpen}
        onClose={() => {
          setMealDialogOpen(false)
          setEditingMeal(undefined)
        }}
        categories={categories}
        meal={editingMeal}
      />

    </TabsContent>
  )
}
