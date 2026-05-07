import type { Metadata } from 'next'
import PageHeroI18n from '@/components/ui/PageHeroI18n'
import AboutStory from '@/components/sections/AboutStory'
import AboutCapabilities from '@/components/sections/AboutCapabilities'
import AboutStrategic from '@/components/sections/AboutStrategic'
import { getAboutContent } from '../../../sanity/lib/queries'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Atlantic EEE Supply is a dedicated maritime supply partner for vessels and operators in Panama. Offices in Panama City and Colón.',
}

export default async function AboutPage() {
  const about = await getAboutContent()

  return (
    <main>
      <PageHeroI18n
        en={{
          label: 'ABOUT US',
          title: 'Maritime supply with purpose.',
          subtitle: 'Atlantic EEE Supply is a dedicated procurement partner for vessels and maritime companies in Panama.',
        }}
        es={{
          label: 'SOBRE NOSOTROS',
          title: 'Suministro marítimo con propósito.',
          subtitle: 'Atlantic EEE Supply es un socio de abastecimiento dedicado a embarcaciones y empresas marítimas en Panamá.',
        }}
        image="/images/cargo-ship.jpg"
      />
      <AboutStory cms={about} />
      <AboutCapabilities cms={about} />
      <AboutStrategic />
    </main>
  )
}
