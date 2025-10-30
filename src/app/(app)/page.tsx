import { Header } from '@/components/Header'
import { Hero, HeroType } from '@/components/Homepage/Hero'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import configPromise from '@payload-config'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { getPayload } from 'payload'
import { ProductCatalog } from '@/components/Homepage/ProductCatalog'
import { Metadata } from 'next'

type HomePageType = {
  hero: HeroType
}

const HOME_PAGE: HomePageType = {
  hero: {
    title: 'TITANIUM EXHAUST SYSTEMS',
    description: 'built for wholesale partners worldwide.',
    icon: GlobeAltIcon,
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Homepage | ${process.env.SITE_NAME}`,
    description: `Titanium Exhaust Systems built for wholesale partners worldwide.`,
  }
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const [products, categories] = await Promise.all([
    payload.find({
      collection: 'products',
      draft: false,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        gallery: true,
        categories: true,
        priceInusd: true,
      },
      sort: 'title',
      pagination: false,
    }),
    payload.find({
      collection: 'categories',
      draft: false,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
      sort: 'title',
      pagination: false,
    }),
  ])

  return (
    <>
      <Hero
        title={HOME_PAGE.hero.title}
        description={HOME_PAGE.hero.description}
        icon={HOME_PAGE.hero.icon}
      />
      <ProductCatalog products={products.docs} categories={categories.docs} />
    </>
  )
}
