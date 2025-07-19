'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

    onSubmit(comment, files)

    await FinalizeOrder()

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

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
      >
        Preview Order
      </button>

    </div>
  )
}
