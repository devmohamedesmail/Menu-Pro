import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { increase_quantity, decrease_quantity, remove_from_cart, reset_cart } from '@/redux/reducers/cart-slice';

export default function CartItem({ item , country }: any) {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch();
    // const cart = useSelector((state: any) => state.cart.meals || []);




    const getItemPrice = (item: any) => {
        if (item.selected_attributes && Object.keys(item.selected_attributes).length > 0) {
            return Object.values(item.selected_attributes).reduce(
                (sum: number, attr: any) => sum + (parseFloat(attr.price) || 0),
                0
            );
        }
        return parseFloat(item.sale_price || item.price || 0);
    };



    // const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    // const totalPrice = cart.reduce((acc: number, item: any) => {
    //     return acc + (getItemPrice(item) * item.quantity);
    // }, 0);


    return (
        <div key={item.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm animate-in slide-in-from-bottom-2 duration-300">
            <div className="w-20 h-20 bg-secondary rounded-xl overflow-hidden shrink-0">
                {item.image ? (
                    <img
                        src={item.image}
                        
                        alt={item.name_ar}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingBag className="w-8 h-8 opacity-20" />
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-foreground line-clamp-1">
                            {i18n.language === "ar" ? item.name_ar : item.name_en}
                        </h3>
                        {/* Selected attributes */}
                        {item.selected_attributes && Object.keys(item.selected_attributes).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                                {Object.values(item.selected_attributes).map((attr: any) => (
                                    <span
                                        key={attr.id}
                                        className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium"
                                    >
                                        {attr.value}
                                        {attr.price && parseFloat(attr.price) > 0 && (
                                            <span className="ms-1 text-primary/70">+{parseFloat(attr.price).toFixed(2)} {i18n.language ==="ar" ? country.currency_ar : country.currency_en}</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => dispatch(remove_from_cart(item.id))}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">
                        {(getItemPrice(item) * item.quantity).toFixed(2)} {i18n.language ==="ar" ? country.currency_ar : country.currency_en}
                    </span>



                    <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                        <button
                            onClick={() => dispatch(decrease_quantity(item.id))}
                            className="w-8 h-8 flex items-center justify-center bg-background rounded-md shadow-sm hover:scale-105 active:scale-95 transition-all text-foreground"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                        <button
                            onClick={() => dispatch(increase_quantity(item.id))}
                            className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-md shadow-sm hover:scale-105 active:scale-95 transition-all"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
