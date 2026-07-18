
import useSettings from '@/hooks/use-settings'
export default function Logo() {
    const {settings}=useSettings()
    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={settings?.logo} className='w-full h-full object-cover' alt={settings?.title_en} />
            </div>
        </div>
    )
}
