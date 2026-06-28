import React,{useState} from 'react'
import ProductImage from './product-image'
import { Country, Meal } from '@/types/menu';
import ProductTitle from './product-title';
import ProductDescription from './product-description';
import ProductPrice from './product-price';
import ProductAction from './product-action';

export default function ProductListCard({ meal, country }: { meal: Meal; country: Country }) {
    const [attrDialogOpen, setAttrDialogOpen] = useState(false);
   const hasAttributes = (meal.attributes?.length ?? 0) > 0;
  return (
     <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group cursor-pointer flex gap-4 p-3 items-center">
                <ProductImage meal={meal} hasAttributes={hasAttributes} />

                <div className="flex-1 min-w-0">
                    <ProductTitle meal={meal} />
                   <ProductDescription meal={meal} />
                    <div className="flex items-center justify-between mt-2 gap-2 flex-wrap">
                      <ProductPrice meal={meal} country={country} />

                      <ProductAction meal={meal} setAttrDialogOpen={setAttrDialogOpen} attrDialogOpen={attrDialogOpen} country={country} />
                    </div>
                </div>
            </div>
  )
}
