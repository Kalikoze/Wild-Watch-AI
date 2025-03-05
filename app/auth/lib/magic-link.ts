import { createClient } from '@/utils/supabase/client';
import { MagicLinkSignInOptions } from '@/app/auth/types';

export const signInWithMagicLink = async (email: string) => {
  const supabase = createClient();

  const options: MagicLinkSignInOptions = {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
    shouldCreateUser: true
  };

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options
  });

  if (error) {
    throw new Error(error.message);
  }
}; 