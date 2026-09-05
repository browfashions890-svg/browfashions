import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// We only ever use the public anon key on the frontend. The anon key is
// safe to expose in client code because Supabase Row Level Security (RLS)
// policies (see supabase/schema.sql) restrict what it can read/write.
// NEVER import or reference a service_role key anywhere in src/.
let supabase = null;
let configError = null;

if (!supabaseUrl || !supabaseAnonKey) {
  configError =
    'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file (see .env.example).';
  // eslint-disable-next-line no-console
  console.warn(`[supabase] ${configError}`);
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

export const isSupabaseConfigured = () => Boolean(supabase);
export const supabaseConfigError = configError;
export { supabase };
