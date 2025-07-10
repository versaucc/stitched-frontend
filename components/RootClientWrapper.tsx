'use client'

import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function RootClientWrapper() {
  useEffect(() => {
    const page = window.location.pathname

    const logPage = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Log page view via Supabase function
        await supabase.rpc('log_page_view', {
          user_id_input: user.id,
          page_path: page,
        })

        // ✅ Mark user as verified if email is confirmed
        
        await supabase
          .from('profiles')
          .update({ verified: true, UID : user.id})
          .eq('email', user.email)
        
      }
    }

    logPage()
  }, [])

  return null
}
