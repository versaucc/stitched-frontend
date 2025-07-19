export interface CustomPairSession {
  session_id: string
  user_id?: string
  pair_name?: string

  // Step tracking
  step_ct: number
  saved: boolean
  ordered: boolean

  // Collected answers from walkthrough
  question1_result?: any
  question2_result?: any
  question3_result?: any
  patches?: any[]
  special_requests?: string
  uploaded_files?: string[]

  // Optional metadata
  notes?: string
  created_at?: string
}