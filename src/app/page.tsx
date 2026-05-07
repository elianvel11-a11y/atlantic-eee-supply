import Hero from '@/components/sections/Hero'
import HomeOverview from '@/components/sections/HomeOverview'
import MissionVision from '@/components/sections/MissionVision'
import HomeProducts from '@/components/sections/HomeProducts'
import HomeWhyUs from '@/components/sections/HomeWhyUs'
import HomeBrands from '@/components/sections/HomeBrands'
import HomeCTA from '@/components/sections/HomeCTA'
import { getHero, getAboutContent, getMissionVision, getBrands } from '../../sanity/lib/queries'

export default async function Page() {
  const [hero, about, mv, brands] = await Promise.all([
    getHero(),
    getAboutContent(),
    getMissionVision(),
    getBrands(),
  ])

  return (
    <main>
      <Hero cms={hero} />
      <HomeOverview cms={about} />
      <MissionVision cms={mv} />
      <HomeProducts />
      <HomeWhyUs />
      <HomeBrands cms={brands} />
      <HomeCTA />
    </main>
  )
}
