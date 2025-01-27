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