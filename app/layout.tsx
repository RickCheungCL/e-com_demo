import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pink1 text-primary2 font-sans antialiased">
        <Toaster
          toastOptions={{
            style: {
              background: '#A8E4A0', // green
              color: '#505477',      // primary2
              border: '1px solidrgb(142, 248, 3)',
              fontWeight: 500,
            },
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
