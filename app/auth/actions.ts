import { createClient } from '@/utils/supabase/client'

export const handleMagicLinkSignUp = async (email: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      shouldCreateUser: true
    }
  });

  if (error) {
    throw new Error(error.message)
  }
}

export const handleOAuthSignUp = async (provider: 'google' | 'microsoft') => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      skipBrowserRedirect: false
    }
  });

  if (error) {
    throw new Error(error.message);
  }
};