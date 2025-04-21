import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Make sure to add them to your .env file.');
}

// Create a single supabase client for the entire app
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export type { SupabaseClient };
export { supabase };