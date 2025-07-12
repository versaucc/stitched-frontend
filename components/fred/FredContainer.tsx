'use client'

import { ReactNode } from 'react'

export default function FredContainer({
  message,
  flagA,
  flagB,
  children,
  className = '',
}: {
  message: string
  flagA: boolean
  flagB: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Fred + Message Box */}
      <div className="absolute top-3/4 left-[10%] transform -translate-y-1/4 z-10">
        <img
          src="/fred/fred-wave.png"
          alt="Fred"
          className="w-56 h-auto"
        />
        <div className="bg-white text-black p-3 rounded shadow-md mt-2 max-w-xs text-sm">
          {message}
        </div>
      </div>

      {/* Content of the walkthrough step */}
      <div className="ml-[160px]">
        {children}
      </div>
    </div>
  )
}


