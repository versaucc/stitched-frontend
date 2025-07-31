'use client'
import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { useRouter } from 'next/navigation'
import VectorAnimation from '../backgrounds/VectorAnimation'

const MIN_BUFFER_TIME = 1000 // ms

export type PageBufferHandle = {
  showAndRedirect: (href: string) => void
}

const PageBuffer = forwardRef<PageBufferHandle>((props, ref) => {
  const [show, setShow] = useState(false)
  const [reverse, setReverse] = useState(false)
  const router = useRouter()
  const startTimeRef = useRef<number | null>(null)
  const pendingHrefRef = useRef<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useImperativeHandle(ref, () => ({
    showAndRedirect: (href: string) => {
      setShow(true)
      setReverse(false)
      startTimeRef.current = Date.now()
      pendingHrefRef.current = href
    }
  }))

  useEffect(() => {
    if (!show || !pendingHrefRef.current) return

    let didNavigate = false

    const handleComplete = () => {
      const elapsed = Date.now() - (startTimeRef.current ?? 0)
      const remaining = Math.max(MIN_BUFFER_TIME - elapsed, 0)
      timeoutRef.current = setTimeout(() => {
        setReverse(true)
      }, remaining)
    }

    // @ts-ignore
    router.events?.on('routeChangeComplete', handleComplete)
    // @ts-ignore
    router.events?.on('routeChangeError', handleComplete)

    // Wait for min buffer time, then redirect if not already navigating
    const minTimeTimeout = setTimeout(() => {
      if (!didNavigate && pendingHrefRef.current) {
        didNavigate = true
        router.push(pendingHrefRef.current)
        pendingHrefRef.current = null
      }
    }, MIN_BUFFER_TIME)

    return () => {
      // @ts-ignore
      router.events?.off('routeChangeComplete', handleComplete)
      // @ts-ignore
      router.events?.off('routeChangeError', handleComplete)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      clearTimeout(minTimeTimeout)
    }
  }, [show, router])

  // Hide buffer after reverse animation completes
  const handleReverseComplete = () => {
    setShow(false)
    setReverse(false)
  }

  if (!show) return null
  return (
    <div>
      <VectorAnimation reverse={reverse} onReverseComplete={handleReverseComplete} />
    </div>
  )
})

export default PageBuffer