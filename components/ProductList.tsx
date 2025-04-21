'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'

type Product = {
  id: string
  name: string
  price: number
  description: string
  image_url: string
}

export default function ProductList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name-az':
        return a.name.localeCompare(b.name)
      case 'name-za':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-xl border border-pink3  text-primary2 placeholder:text-primary2/60 w-full sm:w-1/2"
        />

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-xl border border-pink3 text-primary2 w-full sm:w-fit"
        >
          <option value="default">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-az">Name: A to Z</option>
          <option value="name-za">Name: Z to A</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {sorted.length === 0 ? (
          <p className="text-center text-primary2">No products found.</p>
        ) : (
          sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  )
}
