import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { createServer } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  const supabase = await createServer()

  if (code) {
    // Handle OAuth flow
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) throw error

      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      console.error('OAuth error:', error)
      return NextResponse.redirect(new URL('/auth/auth-error', request.url))
    }
  }

  if (token_hash) {
    // Handle magic link/OTP flow
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as 'email' | 'recovery' | 'invite'
      })

      if (error) {
        return NextResponse.redirect(new URL('/auth/auth-error', request.url), {
          headers: {
            'x-auth-error-type': error.message === "Token has expired or is invalid" ? 'expired' : 'invalid'
          }
        })
      }

      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/auth-error', request.url))
    }
  }

  return NextResponse.redirect(new URL('/auth/auth-error', request.url))
}