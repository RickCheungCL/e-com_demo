'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'

export default function Navbar() {
  const cart = useStore((state) => state.cart)

  return (
    <header className="w-full sticky top-0 z-50 bg-pink1 border-b border-pink3 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-primary2 hover:opacity-80 transition"
        >
          くらしのお店
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-primary2 group-hover:text-primary transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.09.837L5.91 7.25m0 0h12.84l-1.36 6.119a1.125 
                  1.125 0 01-1.091.881H8.25a1.125 1.125 0 01-1.09-.881L5.91 7.25zm0 
                  0L5.186 4.422A1.125 1.125 0 004.125 3H2.25m6 
                  16.5a.75.75 0 100-1.5.75.75 0 
                  000 1.5zm9 0a.75.75 0 100-1.5.75.75 0 
                  000 1.5z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1.5 py-0.5">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}