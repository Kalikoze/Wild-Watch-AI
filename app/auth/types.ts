/**
 * Auth-related types for the Wild-Watch-AI application
 */

/**
 * Props for the AuthErrorMessage component
 */
export interface AuthErrorMessageProps {
  message?: string;
  redirectPath?: string;
  redirectText?: string;
}

/**
 * OAuth providers supported by the application
 */
export type OAuthProvider = 'google' | 'azure';

/**
 * Options for OAuth sign-in
 */
export interface OAuthSignInOptions {
  redirectTo: string;
  skipBrowserRedirect: boolean;
  scopes: string;
}

/**
 * Options for magic link sign-in
 */
export interface MagicLinkSignInOptions {
  emailRedirectTo: string;
  shouldCreateUser: boolean;
}

/**
 * User onboarding status
 */
export type OnboardingStatus = 'not_started' | 'in_progress' | 'completed';

/**
 * Auth error types that can be handled by the application
 */
export type AuthErrorType = 'expired' | 'invalid' | 'general'; 