export interface Country {
    id: number;
    name: string;
    currency_symbol: string;
    currency_en?: string;
    currency_ar?: string;
}

export interface Category {
    id: number;
    name_ar: string;
    name_en: string;
    image: string | null;
    meals_count?: number;
}

export interface AttributeValue {
    id: number;
    value: string;
    price: number | string;
    is_required: boolean;
    is_default:boolean;
}

export interface MealAttribute {
    id: number;
    name_en: string;
    name_ar: string;
    values: AttributeValue[];
    attribute_values: AttributeValue[];
    attribute_id: number
    attribute_value_id: number
}

export interface Meal {
    id: number;
    name_ar: string;
    name_en: string;
    description_ar: string | null;
    description_en: string | null;
    price: string | number;
    sale_price: string | number | null;
    image: string | null;
    category_id: number;
    is_popular?: number | boolean;
    attributes?: MealAttribute[];
    is_simple?:boolean;
    is_featured?:boolean;
    category: {
        id: number
    }
    
}

export interface Store {
    id: number;
    name: string;
    slug: string;
    description: string;
    banner: string | null;
    image: string | null;
    address: string | null;
    phone: string | null;
    is_verified: number;
}

interface MealsResponse{
    data:Meal[]
}

export interface MenuPageProps {
    store: Store;
    categories: Category[];
    country: Country;
    meals: MealsResponse;
    table: string;
}
