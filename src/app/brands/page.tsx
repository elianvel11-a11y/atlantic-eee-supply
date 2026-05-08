import type { Metadata } from 'next'
import PageHeroI18n from '@/components/ui/PageHeroI18n'
import BrandsContent from '@/components/sections/BrandsContent'
import { getBrands } from '../../../sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Brands',
  description: 'Represented manufacturers — DeWalt, 3M, Sea Contractor, Collebon, MSA Safety, Ansell, and more. No substitutes.',
}

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <main>
      <PageHeroI18n
        en={{
          label: 'REPRESENTED MANUFACTURERS',
          title: 'The brands behind every order.',
          subtitle: 'We work exclusively with established manufacturers. No substitutes.',
        }}
        es={{
          label: 'FABRICANTES REPRESENTADOS',
          title: 'Las marcas detrás de cada pedido.',
          subtitle: 'Trabajamos exclusivamente con fabricantes establecidos. Sin sustitutos.',
        }}
        image="/images/industrial-interior.jpg"
      />
      <BrandsContent cms={brands} />
    </main>
  )
}
