import { Meal } from '@/types/menu'
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart, decrease_quantity, increase_quantity } from '@/redux/reducers/cart-slice';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react'


export default function MealQuantity({ meal }: { meal: Meal }) {
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.meals || []);
    const inCart = cart.find((item: any) => item.id === meal.id);
    return (
        <div className="flex items-center justify-between bg-secondary rounded-xl p-1">
            <Button 
            className='w-8 h-8'
            onClick={() => dispatch(decrease_quantity(meal.id))}>
                <Minus />
            </Button>
            <span className="font-bold px-3 text-sm">{inCart.quantity}</span>
              <Button className='w-8 h-8' onClick={() => dispatch(increase_quantity(meal.id))}>
                <Plus />
            </Button>
        </div>
    )
}
