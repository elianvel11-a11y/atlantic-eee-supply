import Hero from '@/components/sections/Hero'
import HomeOverview from '@/components/sections/HomeOverview'
import HomeProducts from '@/components/sections/HomeProducts'
import HomeWhyUs from '@/components/sections/HomeWhyUs'
import HomeBrands from '@/components/sections/HomeBrands'
import HomeCTA from '@/components/sections/HomeCTA'
import { getHero, getAboutContent, getBrands } from '../../sanity/lib/queries'

export default async function Page() {
  const [hero, about, brands] = await Promise.all([
    getHero(),
    getAboutContent(),
    getBrands(),
  ])

  return (
    <main>
      <Hero cms={hero} />
      <HomeOverview cms={about} />
      <HomeProducts />
      <HomeWhyUs />
      <HomeBrands cms={brands} />
      <HomeCTA />
    </main>
  )
}
