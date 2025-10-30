'use client'

import { Product } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { VariantSelector } from './VariantSelector'
import { ProductGallery } from './ProductGallery'
import { useVariantSelector } from './useVariantSelector'
import { Suspense } from 'react'

type Props = {
  product: Product
  gallery: NonNullable<Product['gallery']>
}

export function ProductDetailsClient({ product, gallery }: Props) {
  const variantSelectorState = useVariantSelector(product)
  const { selections } = variantSelectorState

  // Get array of selected option IDs for filtering gallery
  const selectedOptionIds = Object.values(selections)

  return (
    <div className="wrapper-4xl">
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex justify-start">
          <h1 className="text-base font-bold md:text-xl">{product.title}</h1>
        </div>
        {product.description && (
          <div className="flex justify-start">
            <RichText data={product.description} enableProse={true} />
          </div>
        )}
        <div className="flex justify-start">
          <div className="flex flex-col gap-8 md:gap-16">
            <Suspense fallback={null}>
              <VariantSelector variantSelectorState={variantSelectorState} />
            </Suspense>
          </div>
        </div>
        {gallery.length > 0 && (
          <div className="flex justify-start">
            <Suspense fallback={null}>
              <ProductGallery gallery={gallery} selectedOptionIds={selectedOptionIds} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}
