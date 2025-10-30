'use client'
import { Category, Product } from '@/payload-types'
import { useMemo, useState } from 'react'
import { Search } from '../Search'
import { Filter } from '../Filter'
import { ProductGridItem } from '../ProductGridItem'

type Props = {
  products: Pick<Product, 'id' | 'title' | 'gallery' | 'priceInusd' | 'categories' | 'slug'>[]
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
}

export function ProductCatalog({ products, categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterQuery, setFilterQuery] = useState<string[]>([])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value) {
      setFilterQuery([])
    }
  }

  const handleFilterChange = (filters: string[]) => {
    setFilterQuery(filters)
    if (filters.length > 0) {
      setSearchQuery('')
    }
  }

  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim()
      return products.filter((product) => product.title.toLowerCase().includes(query))
    }

    if (filterQuery.length > 0) {
      return products.filter((product) => {
        if (!product.categories || product.categories.length === 0) return false

        return product.categories.some((category) => {
          const categoryId = typeof category === 'string' ? category : category.id
          return filterQuery.includes(categoryId)
        })
      })
    }

    return products
  }, [products, searchQuery, filterQuery])

  return (
    <div className="wrapper-7xl mt-8 md:mt-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Filter
          categories={categories}
          selectedFilters={filterQuery}
          onFilterChange={handleFilterChange}
        />
        <Search value={searchQuery} onChange={handleSearchChange} />
      </div>
      {filteredProducts?.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-x-5 md:gap-y-6">
          {filteredProducts.map((product) => {
            return <ProductGridItem key={product.id} product={product} />
          })}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  )
}
