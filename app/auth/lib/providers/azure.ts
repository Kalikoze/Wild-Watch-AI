import { createClient } from '@/utils/supabase/client';
import { OAuthSignInOptions } from '@/app/auth/types';

export const signInWithAzure = async () => {
  const supabase = createClient();

  const options: OAuthSignInOptions = {
    redirectTo: `${window.location.origin}/auth/callback`,
    skipBrowserRedirect: false,
    scopes: 'email profile'
  };

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
    options
  });

  if (error) {
    throw new Error(error.message);
  }
}; 