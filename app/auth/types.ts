/**
 * Auth-related types for the Wild-Watch-AI application
 */

export interface AuthErrorMessageProps {
  message?: string;
  redirectPath?: string;
  redirectText?: string;
}

export type OAuthProvider = 'google' | 'azure';

export interface OAuthSignInOptions {
  redirectTo: string;
  skipBrowserRedirect: boolean;
  scopes: string;
}

export interface MagicLinkSignInOptions {
  emailRedirectTo: string;
  shouldCreateUser: boolean;
}

export type OnboardingStatus = 'not_started' | 'in_progress' | 'completed';

export type AuthErrorType = 'expired' | 'invalid' | 'general'; 