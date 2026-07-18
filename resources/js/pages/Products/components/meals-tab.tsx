import { useState } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UtensilsCrossed } from 'lucide-react'
import EmptyState from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import MealDialog from './meal-dialog'
import { router } from '@inertiajs/react'
import MealCard from './meal-card'
import { Meal } from '@/types/menu'
import useImport from '@/hooks/use-import'
import useSelectedStore from '@/hooks/use-selected-store'



declare function route(name: string, params?: any): string
export default function MealsTab({ meals, categories, country, attributes }: any) {
  const { t } = useImport()
  const [mealDialogOpen, setMealDialogOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | undefined>()


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
            <p> {meals?.data?.length} </p>
          </div>
          <Button onClick={() => setMealDialogOpen(true)}>
            <UtensilsCrossed className="w-4 h-4 mr-2" />
            {t('dashboard.add-new-meal')}
          </Button>
        </CardHeader>
        <CardContent>
          {meals?.data?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {meals?.data?.map((meal: any) => (
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
