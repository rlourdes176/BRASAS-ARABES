import { createClient as supabaseCreateClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () => {
  return supabaseCreateClient(supabaseUrl, supabaseKey)
}
