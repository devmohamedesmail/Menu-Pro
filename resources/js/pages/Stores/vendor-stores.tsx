import useSelectedStore from '@/hooks/use-selected-store';
import useUserStores from '@/hooks/use-user-stores'
import { Store } from '@/types/menu';
import { Link, router } from '@inertiajs/react';
import { Image, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VendorStoresPage() {
    const { stores } = useUserStores();
    const { t } = useTranslation()
    const { selectedStore, selectStore, clearStore , getCurrentStore }:any = useSelectedStore();

    const handleSelectStore = async (store: Store) => {
         selectStore(store)
         const currentStore = getCurrentStore() 
        router.get(`/store/dashboard/${currentStore?.id}`)
       
    }
   

    return (
        <div className='flex items-center justify-center h-screen gap-5'>
            {stores?.map((store: Store) => (
                <button onClick={() => handleSelectStore(store)} 
                key={store?.id}
                className='border shadow-md w-44 h-44 flex flex-col items-center justify-center rounded-md  overflow-hidde pb-4 hover:scale-105 transition-all duration-200 cursor-pointer'>
                    {store?.image ? <img className='w-44 h-44 overflow-hidden object-cover rounded-t-md' src={store?.image} alt={store?.name} /> : <Image size={30} />}

                    <h3 className='font-bold mt-4'> {store?.name}</h3>
                </button>
            ))}
            <Link href={'/register/store/page'} className='border bg-primary text-white shadow-md w-44 h-44 flex flex-col items-center justify-center rounded-md'>
                <Plus size={30} />
                <h3 className='font-bold'> {t('stores.add-new-store')}</h3>
            </Link>
        </div>
    )
}
