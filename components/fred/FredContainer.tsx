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
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={`text-white p-4 rounded shadow ${className}`}>
      <p>{message}</p>
      {children}
    </div>
  )
}


