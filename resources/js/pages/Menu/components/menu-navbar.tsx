import LangToggleIcon from '@/components/shared/lang-toggle-icon'
import ThemeToggleIcon from '@/components/shared/theme-toggle-icon'
import { Store } from '@/types/menu'
import { useTranslation } from 'react-i18next'
import { ConciergeBell } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectLabel } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import { Textarea } from '@/components/ui/textarea'
import { router } from '@inertiajs/react'
import toast from 'react-hot-toast'


export default function MenuNavbar({ store, table }: { store: Store, table: any }) {
    const { t } = useTranslation()
    const [callwaiterDialog, setCallWaiterDialog] = useState(false);
    const call = [
        {
            id: 1,
            title_en: "Waiter",
            title_ar: " جرسون ",
            value: "waiter"
        },
        {
            id: 2,
            title_en: "  Bill ",
            title_ar: " دفع فاتورة ",
            value: "bill"
        },
        {
            id: 3,
            title_en: "assistance",
            title_ar: " مساعدة ",
            value: "assistance"
        },

    ]

    const formik = useFormik({
        initialValues: {
            store_id: store.id,
            table_id: table,
            type: 'waiter'
        },
        onSubmit: (values) => {

            router.post('/waiter/call', values, {
                onSuccess: () => {
                    
                    formik.resetForm();
                    setCallWaiterDialog(false)
                    toast.success(t('common.success'))
                },
                onError: () => {
                    toast.success(t('common.error_happened'))
                }
            })
        }
    })
    return (
        <div className='bg-white dark:bg-black py-5 px-3 sticky top-0 shadow-lg border-b-2 z-50'>
            <div className="container mx-auto flex flex-row justify-between">
                <div className='flex flex-row gap-3'>
                    <ThemeToggleIcon />
                    <LangToggleIcon />
                </div>
                <div>

                    {store?.image ? <img className='w-12 h-12' src={store?.image} alt={store?.name} /> : null}
                </div>
                <Button onClick={() => setCallWaiterDialog(true)} className='flex items-center'>
                    <h2 className='mx-1'>{t('menu.call-waiter')}</h2>
                    <ConciergeBell />
                </Button>

                <Dialog open={callwaiterDialog} onOpenChange={() => setCallWaiterDialog(false)}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>{t('menu.why-call-waiter')}</DialogHeader>



                        <div className='flex justify-between items-center gap-3'>

                            {call.map((item: any) => (
                                <label htmlFor={item.id} className='flex border flex-1 py-5'>
                                    <input
                                        name="type"
                                        onChange={formik.handleChange}
                                        id={item.id} type="radio" value={item.value}
                                    />
                                    {item.title_ar}
                                </label>
                            ))}
                        </div>

                        <Label>{t('menu.note')}</Label>
                        <Textarea
                            name="note"
                            onChange={formik.handleChange}>
                        </Textarea>


                        <Button className='' onClick={() => formik.handleSubmit()}>{t('menu.send')}</Button>
                    </DialogContent>

                </Dialog>
            </div>
        </div>
    )
}
