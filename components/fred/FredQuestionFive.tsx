'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FinalizeOrder } from './FinalizeOrder'
import { supabase } from '../../lib/supabase'

export default function FredQuestionFive({
  onSubmit
}: {
  onSubmit: (note: string, files: File[]) => void
}) {
  const [comment, setComment] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const router = useRouter()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...droppedFiles])
    setDragging(false)
  }

  const handleSubmit = async () => {
    const session_id = localStorage.getItem('custom_session_id')
    if (!session_id) {
      console.error('No session ID found in localStorage')
      return
    }

    // Convert filenames (or eventually URLs if uploading to storage)
    const fileNames = files.map(file => file.name)

    const { error } = await supabase
      .from('custom_orders')
      .update({
        special_requests: comment,
        uploaded_files: fileNames,
        saved: true,
        step_ct: 0
      })
      .eq('session_id', session_id)

    if (error) {
      console.error('Failed to update order in Question 5:', error)
      return
    }

    // Optional tracking for parent
    onSubmit(comment, files)

    // Finalize the order (e.g., log status, clear working session, etc.)
    await FinalizeOrder()

    // Redirect
    router.push('/fred/summary')
  }

  return (
    <div className="flex flex-col items-center space-y-6">

      <textarea
        placeholder="Additional details, ideas, or needs..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full max-w-md h-32 p-3 rounded bg-white text-black"
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`w-full max-w-md h-32 border-2 border-dashed rounded flex items-center justify-center ${
          dragging ? 'border-green-400 bg-green-50' : 'border-gray-400'
        }`}
      >
        {files.length === 0
          ? 'Drag and drop files here'
          : `${files.length} file${files.length > 1 ? 's' : ''} added`}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
      >
        Preview Order
      </button>
    </div>
  )
}
