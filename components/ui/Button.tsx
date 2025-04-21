'use client'

import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-primary text-black px-6 py-2 rounded-xl font-medium shadow-sm hover:shadow-md transition active:scale-95 ${className}`}
    >
      {children}
    </button>
  )
}
