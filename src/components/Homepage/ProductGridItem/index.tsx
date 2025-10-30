import { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: Partial<Product>
}
export function ProductGridItem({ product }: Props) {
  const { gallery, priceInusd, title } = product

  let price = priceInusd

  const variants = product.variants?.docs
  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInusd &&
      typeof variant.priceInusd === 'number'
    ) {
      price = variant.priceInusd
    }
  }
  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  const imageSrc = image ? `${process.env.NEXT_PUBLIC_SERVER_URL}${image.url}` : ''
  const imageAlt = image ? image.alt : ''
  return (
    <Link className="group w-full" href={`/products/${product.slug}`}>
      <div className="bg-card group-hover:bg-foreground flex w-full flex-col gap-2 p-2 transition-all duration-300 md:gap-3 md:p-3">
        <Image
          className="bg-background aspect-square w-full object-cover"
          src={imageSrc}
          alt={imageAlt}
          height={300}
          width={300}
        ></Image>
        <div className="group-hover:text-primary-foreground flex h-42 w-full items-center justify-center transition-all duration-300">
          <p className="text-center text-sm md:text-base">{title}</p>
        </div>
      </div>
    </Link>
  )
}
