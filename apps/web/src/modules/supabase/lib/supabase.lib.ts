import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!;
const supabaseAnonKey = process.env.SUPABASE_PROJECT_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
