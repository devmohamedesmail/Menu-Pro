import React from 'react'
import { useTranslation } from 'react-i18next'
import { router } from '@inertiajs/react'
import { Plus, Trash2, X, Tag } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


declare function route(name: string, params?: any): string
export default function MealDeleteDialog({ open, onClose, meal, setdeleteDialogOpen }: any) {
    const { t, i18n } = useTranslation()
    const isAr = i18n.language === 'ar'

    const handleDeleteMeal = () => {


        router.delete(route('store.meal.delete', meal?.id))
        setdeleteDialogOpen(false)

    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trash2 className="w-5 h-5 text-primary" />
                        {t('common.delete')} —{' '}
                        <span className="text-primary font-bold">
                            {isAr ? meal?.name_ar : meal?.name_en}
                        </span>
                    </DialogTitle>
                </DialogHeader>




                {/* ── Footer ──────────────────────────────────────────── */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                        {t('common.cancel')}
                    </Button>
                    <Button onClick={() => handleDeleteMeal()} >

                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
