import { Head } from '@inertiajs/react';
import { Category, MenuPageProps } from '@/types/menu';
import MenuHero from './components/menu-hero';
import CategoriesSection from './components/categories-section';
import MealsSection from './components/meals-section';
import CartSection from './components/cart-section';
import MenuNavbar from './components/menu-navbar';
import { useEffect, useState } from 'react';

export default function MenuPage(
  { store, categories, country, meals, table }: MenuPageProps
) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [filterMeals, setFilterMeals] = useState(meals?.data)

  useEffect(() => {
    if (!selectedCategory) {
      setFilterMeals(meals?.data)
      return
    }
    const filtered = meals.data.filter((meal: any) => meal.category_id === selectedCategory?.id)
    setFilterMeals(filtered)
  }, [selectedCategory])

  return (
    <div className="">
      <Head title={`${store.name} - Menu`} />
      <MenuNavbar store={store} table={table} />
      <MenuHero store={store} table={table} />
      <CategoriesSection categories={categories} setSelectedCategory={setSelectedCategory} />
      <MealsSection meals={meals} country={country} filterMeals={filterMeals} />
      <CartSection store={store} table={table} country={country} />
    </div>
  )
}
