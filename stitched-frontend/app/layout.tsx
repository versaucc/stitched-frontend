// layout.tsx
import './globals.css'
import RootClientWrapper from '../components/RootClientWrapper'

export const metadata = { /* ... */ }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootClientWrapper />
        {children}
      </body>
    </html>
  )
}
