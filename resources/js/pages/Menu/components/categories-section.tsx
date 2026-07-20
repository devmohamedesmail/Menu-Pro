import SectionTitle from "@/components/shared/section-title";
import { ChevronLeft, ChevronRight, Image, UtensilsCrossed } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CategoryItem from "./category-item";
import useImport from "@/hooks/use-import";

export default function CategoriesSection({ categories, setSelectedCategory }: any) {
    const { t, i18n } = useImport();
    

    const autoplay = Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    });

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            dragFree: false,
            skipSnaps: false,
        },
        [autoplay]
    );

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    return (
        <section className="container mx-auto px-4 py-12">
            <SectionTitle title={t("common.browse-categories")} />

            <div className="relative group">
                {/* Left Button */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-2 top-1/2 z-20 -translate-y-1/2 h-11 w-11 rounded-full bg-white shadow-lg border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft className="mx-auto h-5 w-5" />
                </button>

                {/* Right Button */}
                <button
                    onClick={scrollNext}
                    className="absolute right-2 top-1/2 z-20 -translate-y-1/2 h-11 w-11 rounded-full bg-white shadow-lg border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight className="mx-auto h-5 w-5" />
                </button>


                {/* Carousel */}
                <div className="overflow-hidden " ref={emblaRef}>
                    <div className="flex">

                        <CategoryItem 
                        title={t('menu.all')} onClick={() => setSelectedCategory(null)} 
                        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                        />
                        {categories.map((category: any) => (

                            <CategoryItem
                                key={category.id}
                                onClick={() => setSelectedCategory(category)}
                                title={i18n.language === "ar" ? category.name_ar : category.name_en}
                                image={category.image} alt={i18n.language === "ar" ? category.name_ar : category.name_en}
                                
                                />
                                
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}