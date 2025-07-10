// Only for dev/test; replace with DB or Supabase later
let submissions: any[] = []

export async function POST(req: Request) {
  const data = await req.json()
  submissions.push({ ...data, time: Date.now() })
  console.log('New custom suite submission:', data)
  return Response.json({ success: true })
}
