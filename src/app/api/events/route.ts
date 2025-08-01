import { supabase } from '@/lib/supabase/client'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tier = searchParams.get('tier');

  let query = supabase.from('events').select('*');

  // If a tier is specified (and it's not 'all'), filter the query
  if (tier && tier !== 'all') {
    query = query.eq('tier', tier);
  }

  const { data, error } = await query;
  
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
