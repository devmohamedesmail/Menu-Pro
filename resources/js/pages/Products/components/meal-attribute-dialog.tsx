import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { router } from '@inertiajs/react'
import { Plus, Trash2, X, Tag } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Checkbox } from '@/components/ui/checkbox'
import useImport from '@/hooks/use-import'

interface Attribute {
    id: number
    name_en: string
    name_ar: string
    slug_en: string
    slug_ar: string
}

interface AttributeValue {
    id: number
    attribute_id: number
    meal_id: number
    value: string
    price: number
    attribute?: Attribute
}

interface MealAttributeDialogProps {
    open: boolean
    onClose: () => void
    meal: any
    attributes: Attribute[]
}


declare function route(name: string, params?: any): string

export default function MealAttributeDialog({
    open,
    onClose,
    meal,
    attributes,
}: MealAttributeDialogProps) {
    
 const {t , isArabic}=useImport()

    const formik = useFormik({
        initialValues: {
        
            rows: meal ? meal.attributes.flatMap((attribute: any) => attribute.attribute_values.map((value: any) => ({
                attribute_id: value.attribute_id,
                value: value.value,
                price: value.price,
                attribute_name: attribute.name_ar,
                is_default: value.is_default,
                is_required: value.is_required
            }))) :
                [{
                    attribute_id: '',
                    value: "",
                    price: 0,
                    is_default: false,
                    is_required: false
                }]

        },
        onSubmit: (values) => {
            const valid = values.rows.filter((r:any) => r.attribute_id && r.value.trim())
            if (valid.length === 0) return

            router.post(

                route('add.attributes.meal', meal.id),
                { values: valid } as any,
                {
                    onSuccess: () => {
                        toast.success(t('common.success'))
                        setSubmitting(false)
                        onClose()
                    },
                    onError: (errors) => {
                        setSubmitting(false)
                        toast.error(t('common.error_happended'))
                    },
                    preserveScroll: true,
                }
            )
        }
    })


    const [submitting, setSubmitting] = useState(false)
    const existingValues: AttributeValue[] = meal?.attribute_values ?? []

    const getAttrName = (attr: Attribute) => isArabic ? attr.name_ar : attr.name_en

    const addRow = () => {
        formik.setFieldValue("rows", [
            ...formik.values.rows, {
                attribute_id: '',
                value: "",
                price: 0,
                is_default: false,
                is_required: false
            }
        ])
    }

    const updateRow = (index: number, field: string, value: any) => {
        const rows = [...formik.values.rows];
        rows[index] = {
            ...rows[index],
            [field]: value
        }
    }

    const removeRow = (index: number) => {
        formik.setFieldValue("rows", formik.values.rows.filter((_: any, i: number) => i! == index))
    }


    const handleDeleteValue = (valueId: number) => {
        if (!confirm(t('dashboard.confirm-delete-attr-value'))) return
        router.delete(route('store.meal.attribute_values.delete', valueId), {
            preserveScroll: true,
        })
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()} >
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary" />
                        {t('dashboard.manage_attributes')} —{' '}
                        <span className="text-primary font-bold">
                            {isArabic ? meal?.name_ar : meal?.name_en}
                        </span>
                    </DialogTitle>
                </DialogHeader>

            
                {/* ── Add new rows ─────────────────────────────────────── */}
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {t('dashboard.add_attribute_values')}
                    </p>

                    {formik.values.rows.map((row: any, idx: any) => (
                        <div key={idx} className="grid grid-cols-[1fr_1fr_1fr] gap-2 items-end mb-4 border p-2 ">
                            {/* Attribute selector */}
                            <div>
                                {idx === 0 && (
                                    <Label className="text-xs mb-1 block">
                                        {t('dashboard.attribute')}
                                    </Label>
                                )}
                                <Select
                                    value={row.attribute_id}
                                    onValueChange={(value) => formik.setFieldValue(`rows.${idx}.attribute_id`, value)}
                                >
                                    <SelectTrigger className="h-9 text-sm">
                                        <SelectValue

                                            placeholder={row.attribute_name ? row.attribute_name : t('dashboard.select_attribute')}


                                        />
                                        <span>{row.attribute_name}</span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {attributes.map((attr) => (
                                            <SelectItem key={attr.id} value={String(attr.id)}>
                                                {getAttrName(attr)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Value text */}
                            <div>
                                {idx === 0 && (
                                    <Label className="text-xs mb-1 block">
                                        {t('dashboard.value')}
                                    </Label>
                                )}
                                <Input
                                    className="h-9 text-sm"
                                    placeholder={t('dashboard.value_placeholder')}
                                    value={row.value}
                                    // onChange={(e) => updateRow(idx, 'value', e.target.value)}
                                    onChange={(e) => formik.setFieldValue(`rows.${idx}.value`, e.target.value)}
                                />
                            </div>

                            {/* Extra price */}
                            <div>
                                {idx === 0 && (
                                    <Label className="text-xs mb-1 block">
                                        {t('dashboard.extra_price')}
                                    </Label>
                                )}
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="h-9 text-sm w-20"
                                    value={row.price}
                                    // onChange={(e) => updateRow(idx, 'price', e.target.value)}
                                    onChange={(e) => formik.setFieldValue(`rows.${idx}.price`, Number(e.target.value))}
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <Checkbox
                                    checked={Boolean(row.is_default)}
                                    // value={row.is_default}
                                    onCheckedChange={(checked) => formik.setFieldValue(`rows.${idx}.is_default`, checked)} />
                                <Label>{t('common.is_default')}</Label>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <Checkbox 
                                checked={Boolean(row.is_required)}
                                value={row.is_required} 
                                onCheckedChange={(checked) => formik.setFieldValue(`rows.${idx}.is_required`, checked)} />
                                <Label>{t('common.is_required')}</Label>
                            </div>

                            {/* Remove row */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-destructive hover:bg-destructive/10"
                                onClick={() => removeRow(idx)}
                            // disabled={rows.length === 1}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-1.5 text-xs"
                        onClick={addRow}
                    >
                        <Plus className="w-3.5 h-3.5" />
                        {t('dashboard.add_another_row')}
                    </Button>
                </div>

                {/* ── Footer ──────────────────────────────────────────── */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                        {t('common.cancel')}
                    </Button>
                    <Button onClick={() => formik.handleSubmit()} disabled={submitting}>
                        {submitting ? t('common.saving') : t('dashboard.save_attributes')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
