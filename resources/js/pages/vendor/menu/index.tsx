
import { Head } from '@inertiajs/react';
import HeroSection from '@/components/vendor/menu/hero-section';
import SearchSection from './search-section';
import FloatCart from './float-cart';
import { MenuPageProps } from '@/types/menu';
import CategoriesSection from './categories-section';
import MealsHeader from './meals-header';
import MealsSection from './meals-section';
import useMenu from '@/hooks/use-menu';

type ViewMode = 'grid' | 'list';


export default function MenuPage({ store, categories, country, meals, table }: MenuPageProps) {
    const {
        selectedCategory,
        // setSelectedCategory,
        // isAnimating,
        // pendingCategoryRef,
        getCategoryName,
        filteredMeals,
        setViewMode,
        viewMode,
        mealsContainerRef,
        t,
        i18n,
        isRTL,
        handleCategoryClick
    } = useMenu({ meals })


    return (
        <div className="min-h-screen bg-background pb-28">
            <Head title={`${store.name} - Menu`} />

            <HeroSection store={store} table={table} />
            <SearchSection />


            <CategoriesSection
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
            />

            {/* ── Meals Section ────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 py-6">



                <MealsHeader
                    selectedCategory={selectedCategory}
                    getCategoryName={getCategoryName}
                    categories={categories}
                    filteredMeals={filteredMeals}
                    setViewMode={setViewMode}
                    viewMode={viewMode}
                />
                

                <MealsSection
                    filteredMeals={filteredMeals}
                    mealsContainerRef={mealsContainerRef}
                    viewMode={viewMode} country={country} />
            </div>

            <FloatCart store={store} table={table} />
        </div>
    );
}
