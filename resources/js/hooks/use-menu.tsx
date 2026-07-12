import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { Category } from '@/types/menu';
import { gsap } from 'gsap';

type ViewMode = 'grid' | 'list';
export default function useMenu({ meals }: any) {
    const { i18n, t } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const mealsContainerRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);
    const pendingCategoryRef = useRef<number | null | undefined>(undefined);
    const filteredMeals = selectedCategory
        ? meals.data.filter((m: any) => m.category_id === selectedCategory)
        : meals.data;

    // ── Animate cards IN after state change ──────────────────────────────────
    useEffect(() => {
        const container = mealsContainerRef.current;
        isAnimating.current = false;
        if (!container || container.children.length === 0) return;

        gsap.fromTo(
            container.children,
            { opacity: 0, y: 20, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.04, ease: 'power3.out' }
        );
    }, [filteredMeals, viewMode]);

    // ── Category click handler ────────────────────────────────────────────────
    const handleCategoryClick = useCallback((categoryId: number | null) => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        pendingCategoryRef.current = categoryId;

        const container = mealsContainerRef.current;

        const applyChange = () => {
            if (pendingCategoryRef.current === categoryId) {
                setSelectedCategory(categoryId);
            }
            isAnimating.current = false;
        };

        if (!container || container.children.length === 0) {
            applyChange();
            return;
        }

        gsap.to(container.children, {
            opacity: 0,
            y: -16,
            scale: 0.95,
            duration: 0.18,
            stagger: 0.015,
            ease: 'power2.in',
            onComplete: applyChange,
        });

        const timer = setTimeout(() => {
            if (isAnimating.current) applyChange();
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    const getCategoryName = (cat: Category) => isRTL ? cat.name_ar : cat.name_en;

    return {
        selectedCategory, 
        setSelectedCategory,
        handleCategoryClick, 
        getCategoryName, 
        filteredMeals, 
        setViewMode, 
        viewMode, 
        mealsContainerRef,
        t,
        i18n,
        isRTL,
        isAnimating,
        pendingCategoryRef
    }
}
