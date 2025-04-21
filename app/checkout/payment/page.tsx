'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PaymentPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    card: '',
    expiry: '',
    cvv: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePay = () => {
    if (form.card === '0000') {
      router.push('/checkout/success')
    } else {
      alert('Invalid card. Use 0000 to simulate success.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-left">
        <h1 className="text-xl font-bold text-clay mb-6">💳 Payment Information</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-600">Name on Card</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Jane Doe"
              className="w-full px-4 py-2 border border-zinc-300 rounded-xl"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-600">Card Number</label>
            <input
              name="card"
              value={form.card}
              onChange={handleChange}
              type="text"
              placeholder="0000"
              className="w-full px-4 py-2 border border-zinc-300 rounded-xl"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-zinc-600">Expiry</label>
              <input
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-zinc-300 rounded-xl"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-zinc-600">CVV</label>
              <input
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 border border-zinc-300 rounded-xl"
              />
            </div>
          </div>

          <button
            onClick={handlePay}
            className="w-full bg-clay hover:bg-clayDark text-white font-medium py-2 rounded-xl mt-4 transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </main>
  )
}
