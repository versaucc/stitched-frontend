// components/fred/FredMessageBubble.tsx
'use client'

export default function FredMessageBubble({ message }: { message: string }) {
  return (
    <div className="absolute top-10 left-[35%] z-50 max-w-xs p-3 rounded-xl border border-white bg-white/10 text-white text-sm shadow-md backdrop-blur-sm">
      {message}
    </div>
  )
}
