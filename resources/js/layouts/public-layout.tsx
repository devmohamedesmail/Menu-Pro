import FloatContact from '@/components/shared/float-contact'
import Footer from '@/components/shared/footer'
import NavBar from '@/pages/Public/Home/components/nav-bar'
import React from 'react'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar />
            {children}
            <FloatContact />

            <Footer />
        </div>
    )
}
