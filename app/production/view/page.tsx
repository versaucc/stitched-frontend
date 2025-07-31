

// app/production/view/page.tsx
'use client'

import { useState } from 'react'

export default function ProductionView() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Search Inventory</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md border p-2 rounded shadow-sm"
        placeholder="Search by size, silhouette, QR ID, etc."
      />

      <div className="mt-6">
        {/* Placeholder: Show results once DB is wired */}
        <p className="text-gray-500">No results to display.</p>
      </div>
    </div>
  )
}