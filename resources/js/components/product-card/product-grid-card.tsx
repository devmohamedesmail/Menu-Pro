import { useState } from 'react';
import { Country, Meal } from '@/types/menu';
import ProductImage from './product-image';
import ProductTitle from './product-title';
import ProductPrice from './product-price';
import ProductDescription from './product-description';
import ProductAction from './product-action';


export default function ProductGridCard({ meal, country }: { meal: Meal; country: Country }) {
    const [attrDialogOpen, setAttrDialogOpen] = useState(false);
    const hasAttributes = (meal.attributes?.length ?? 0) > 0;


    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col">
            <ProductImage meal={meal} hasAttributes={hasAttributes} />
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1 gap-2">
                    <ProductTitle meal={meal} />
                    <ProductPrice meal={meal} country={country} />
                </div>
                <ProductDescription meal={meal} />
                <ProductAction meal={meal} setAttrDialogOpen={setAttrDialogOpen} attrDialogOpen={attrDialogOpen} country={country} />
            </div>
        </div>
    )
}
