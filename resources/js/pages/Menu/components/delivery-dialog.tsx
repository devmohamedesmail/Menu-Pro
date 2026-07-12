import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
export default function DeliveryDialog({ showDeliveryDialog, setShowDeliveryDialog, isRTL, t, formik, handleSubmitOrder }: any) {
    return (
        <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
            <DialogContent className="max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <MapPin className="w-5 h-5 text-primary" />
                        {t('menu.delivery_info')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('menu.delivery_info_desc')}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <Label htmlFor="delivery-name" className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-muted-foreground" />
                            {t('auth.name')} *
                        </Label>
                        <Input
                            id="delivery-name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            placeholder={t('auth.name-placeholder')}
                            name="name"

                        />
                        <InputError message={formik.errors.name} />

                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <Label htmlFor="delivery-phone" className="flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            {t('common.phone')} *
                        </Label>
                        <Input
                            id="delivery-phone"
                            type="tel"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            placeholder="+966 5xx xxx xxx"
                            name="phone"
                        />
                        <InputError message={formik.errors.phone} />
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                        <Label htmlFor="delivery-address" className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {t('common.address')} *
                        </Label>
                        <Textarea
                            id="delivery-address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            placeholder={t('stores.enter-store-address')}
                            rows={2}

                        />
                        <InputError message={formik.errors.address} />
                    </div>



                    {/* Note (optional) */}
                    <div className="space-y-1.5">
                        <Label htmlFor="delivery-note">
                            {t('menu.note')}
                            <span className="text-muted-foreground text-xs ms-1">({t('auth.optional')})</span>
                        </Label>
                        <Textarea
                            id="delivery-note"
                            value={formik.values.note}
                            onChange={formik.handleChange}
                            placeholder={t('menu.note_placeholder')}
                            rows={2}
                            name="note"
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => setShowDeliveryDialog(false)}

                    >
                        {t('dashboard.cancel')}
                    </Button>
                    <Button
                        onClick={() => formik.handleSubmit()}
                        // onClick={() => handleSubmitOrder()}
                        disabled={formik.isSubmitting}
                        className="shadow-lg shadow-primary/20"
                    >
                        {formik.isSubmitting ? t('common.saving') : t('menu.send_order')}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
