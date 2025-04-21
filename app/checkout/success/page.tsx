'use client'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-body">
      <h1 className="text-2xl font-bold mb-4">✅ Payment Complete</h1>
      <p className="mb-6 text-zinc-500">Thank you for your fake payment.</p>
      <Link href="/" className="bg-clay hover:bg-clayDark text-black px-6 py-2 rounded-xl">
        Back to Home
      </Link>
    </main>
  )
}
