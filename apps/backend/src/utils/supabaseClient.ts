import { createClient } from "@supabase/supabase-js";
// import "dotenv/config";

const supabaseurl = process.env.SUPABASE_URL || " ";
const anonkey = process.env.ANON_KEY || " ";

export const supabase = createClient(supabaseurl, anonkey,{
    auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});
