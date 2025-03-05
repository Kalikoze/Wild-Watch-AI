import { createClient } from '@/utils/supabase/client';
import { OAuthSignInOptions } from '@/app/auth/types';

export const signInWithGoogle = async () => {
  const supabase = createClient();

  const options: OAuthSignInOptions = {
    redirectTo: `${window.location.origin}/auth/callback`,
    skipBrowserRedirect: false,
    scopes: 'email profile'
  };

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options
  });

  if (error) {
    throw new Error(error.message);
  }
}; 