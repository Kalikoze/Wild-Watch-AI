import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  console.log('Auth callback received:', { token_hash, type })

  if (token_hash && type) {
    // Create response to modify cookies on
    const response = new Response(null, {
      status: 302,
    })

    // Create server-side supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            response.headers.append('Set-Cookie', `${name}=${value}`)
          },
          remove(name: string, options: any) {
            response.headers.append('Set-Cookie', `${name}=; max-age=0`)
          },
        },
      }
    )

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // Redirect to dashboard after successful verification
      const redirectUrl = process.env.NODE_ENV === 'production'
        ? 'https://app.wildwatch.ai/dashboard'
        : 'http://app.localhost:3000/dashboard'

      response.headers.set('Location', redirectUrl)
      return response
    }

    console.error('Verification error:', error)
  }

  // Redirect to error page if verification fails
  return Response.redirect(new URL('/auth/auth-error', request.url))
}