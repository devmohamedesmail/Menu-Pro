import useImport from '@/hooks/use-import';
import { Search } from 'lucide-react'

export default function MenuHero({ store, table }: { store: any, table: any }) {
    const { t } = useImport();
  
    return (
        <header className='h-[30vh] lg:h-screen flex flex-col justify-center items-center  ' style={{ backgroundImage: `${store?.banner}` }}>
            <h2 className='font-extrabold text-3xl'>{t('menu.welcome-title')}</h2>
            <h3 className='font-bold mt-5'>{store.name}</h3>

            {table ? <div className='flex items-center gap-3 mt-5'>
                <h3>{t('menu.on-table')}</h3>
                <div className='bg-primary flex items-center justify-center rounded-lg p-1 text-white w-12 h-12'>
                    <h3 className='font-bold  text-center'>{table}</h3>
                </div>

            </div> : null}

            <div className='w-full lg:w-1/3 p-3 mt-10 flex items-center'>
                <input
                    placeholder={t('menu.search_for_meal')}
                    className='border w-full block h-12 rounded-md focus:border-primary px-3 focus:outline-none' />
                <button className='bg-primary h-12 w-12 flex justify-center items-center rounded-md'>
                    <Search className='text-white' />
                </button>

            </div>

        </header>
    )
}
