
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart, decrease_quantity, increase_quantity } from '@/redux/reducers/cart-slice';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ProductAttributeDialog from './product-attribute-dialog';

export default function ProductAction({ meal , setAttrDialogOpen,attrDialogOpen,country }: any) {
    const {t}=useTranslation()
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.meals || []);
    const inCart = cart.find((item: any) => item.id === meal.id);
    const hasAttributes = (meal.attributes?.length ?? 0) > 0;




      const handleAddClick = () => {
        if (hasAttributes) {
            setAttrDialogOpen(true);
        } else {
            dispatch(add_to_cart({ ...meal, quantity: 1 }));
            toast.success(t('menu.added_to_cart'), { position: 'top-center', duration: 2000 });
        }
    };



    return (
        <div>
            {inCart && !hasAttributes ? (
                <div className="flex items-center justify-between bg-secondary rounded-xl p-1">
                    <button
                        onClick={() => dispatch(decrease_quantity(meal.id))}
                        className="w-9 h-9 flex items-center justify-center bg-background rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors text-lg font-bold"
                    >
                        −
                    </button>
                    <span className="font-bold">{inCart.quantity}</span>
                    <button
                        onClick={() => dispatch(increase_quantity(meal.id))}
                        className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-bold"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAddClick}
                    className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground font-medium py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                    <ShoppingBag className="w-4 h-4" />

                    {hasAttributes ? t('menu.select_your_choices') : t('menu.add_to_order')}
                </button>
            )}







                        {hasAttributes && (
                            <ProductAttributeDialog
                                open={attrDialogOpen}
                                onClose={() => setAttrDialogOpen(false)}
                                meal={meal}
                                country={country}
                            />
                        )}
        </div>
    )
}
