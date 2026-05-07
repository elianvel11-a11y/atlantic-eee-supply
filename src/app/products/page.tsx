import type { Metadata } from 'next'
import PageHeroI18n from '@/components/ui/PageHeroI18n'
import ProductsContent from '@/components/sections/ProductsContent'
import { getCategories } from '../../../sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Products',
  description: '12 maritime supply categories. Industrial and marine products for vessels operating through the Panama Canal.',
}

export default async function ProductsPage() {
  const categories = await getCategories()

  return (
    <main>
      <PageHeroI18n
        en={{
          label: 'PRODUCT CATALOG',
          title: 'Everything a vessel needs to operate.',
          subtitle: '12 critical maritime categories. Trusted brands. Direct supply.',
        }}
        es={{
          label: 'CATÁLOGO DE PRODUCTOS',
          title: 'Todo lo que una embarcación necesita.',
          subtitle: '12 categorías marítimas críticas. Marcas confiables. Suministro directo.',
        }}
      />
      <ProductsContent cms={categories} />
    </main>
  )
}
