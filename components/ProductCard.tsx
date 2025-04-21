'use client'

import Image from 'next/image'
import { useStore } from '@/lib/store'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'

type Product = {
  id: string
  name: string
  price: number
  description: string
  image_url: string
}

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useStore((state) => state.addToCart)

  const handleAdd = () => {
    addToCart(product)
    toast.success('🛒 Added to cart!')
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-pink2 border border-pink3 shadow-sm">
      <div className="aspect-square w-full relative">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-primary2">{product.name}</h2>
        <p className="text-sm text-primary">${product.description}</p>
        <p className="text-primary font-bold mt-2">${product.price.toFixed(2)}</p>
        <Button onClick={handleAdd}>Add to Cart</Button>
      </div>
    </div>
  )
}
