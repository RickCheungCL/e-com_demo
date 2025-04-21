import { create } from 'zustand'

type Product = {
  id: string
  name: string
  price: number
  image_url: string
  quantity?: number
}

type Store = {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
}

export const useStore = create<Store>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((p) => p.id === product.id)
      if (existing) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
          ),
        }
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
        }
      }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((p) =>
        p.id === id ? { ...p, quantity } : p
      ),
    })),
}))
