import PublicLayout from '@/layouts/public-layout'
import Hero from './components/hero'
import Benefits from './components/benefits'
import Features from './components/features'
import CTA from './components/cta'

export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <Benefits />
      <Features />
      <CTA />
    </PublicLayout>
  )
}
