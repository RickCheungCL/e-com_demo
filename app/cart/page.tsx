'use client'

import { useStore } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const cart = useStore((state) => state.cart)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const updateQuantity = useStore((state) => state.updateQuantity)

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)

  return (
    <main className="bg-pink1 max-w-4xl mx-auto px-6 py-10 text-primary2">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-primary">
          Your cart is empty.{' '}
          <Link href="/" className="text-primary underline">
            Go shopping
          </Link>.
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-4 border-b border-pink3 pb-4"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-primary">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <label className="text-sm">Qty:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 border border-pink3 px-2 py-1 rounded text-primary2"
                    />
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      className="w-fit text-xs bg-red-400 hover:bg-red-500 text-white px-3 py-1"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout/payment" className="w-40">
              <Button>Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </main>
  )
}
