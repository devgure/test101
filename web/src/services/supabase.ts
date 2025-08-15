import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const signInWithGoogle = () => {
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5173/auth/callback',
    },
  });
};

export const signInWithApple = () => {
  supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: 'http://localhost:5173/auth/callback',
    },
  });
};