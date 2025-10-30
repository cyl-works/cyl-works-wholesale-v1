'use client'

import type { Media, Product } from '@/payload-types'
import React, { useMemo } from 'react'
import Image from 'next/image'

type Props = {
  gallery: NonNullable<Product['gallery']>
  selectedOptionIds: string[]
}

export const ProductGallery: React.FC<Props> = ({ gallery, selectedOptionIds }) => {
  const filteredGallery = useMemo(() => {
    // Separate generic images (no variantOption) from variant-specific images
    const genericImages = gallery.filter((item) => !item.variantOption)

    if (!selectedOptionIds || selectedOptionIds.length === 0) {
      // No variant selected, return generic images only
      return genericImages
    }

    // Find variant-specific images that match the selected options
    const variantImages = gallery.filter((item) => {
      if (!item.variantOption) return false

      const variantOptionId =
        typeof item.variantOption === 'object' ? item.variantOption.id : item.variantOption

      return selectedOptionIds.includes(String(variantOptionId))
    })

    // If variant has variant-specific images, show variant images + generic images
    // If variant has NO variant-specific images, show only generic images
    if (variantImages.length > 0) {
      return [...variantImages, ...genericImages]
    } else {
      return genericImages
    }
  }, [gallery, selectedOptionIds])

  if (!filteredGallery || filteredGallery.length === 0) {
    return null
  }

  return (
    <div className="grid w-full gap-2 md:gap-3">
      {filteredGallery.map((item, index) => {
        if (typeof item.image !== 'object') return null

        const image = item.image as Media
        const imageSrc = image.url ? `${process.env.NEXT_PUBLIC_SERVER_URL}${image.url}` : ''
        const imageAlt = image.alt || ''

        return (
          <div key={item.id || index} className="aspect-square bg-card">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={image.width || 800}
              height={image.height || 800}
              className="h-full w-full object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}
