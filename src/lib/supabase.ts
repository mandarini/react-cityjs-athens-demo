import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configure auth settings
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Export type helpers
export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: number;
          title: string;
          completed: boolean;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          completed?: boolean;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          completed?: boolean;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};