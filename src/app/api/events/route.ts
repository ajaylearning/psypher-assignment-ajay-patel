import { supabase } from '@/lib/supabase/client'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
  return new Response(
    JSON.stringify({ success: true, data }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
