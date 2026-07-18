
import useSettings from '@/hooks/use-settings';
export default function AppLogoIcon() {
    const { settings } = useSettings()

    return (
        <div>
            <img src={settings?.logo} className='w-fit ' alt={settings?.title_en} />
        </div>
    );
}
