import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')

  if (!token_hash) {
    return NextResponse.redirect(new URL('/auth/auth-error', request.url), {
      headers: {
        'x-auth-error-type': 'invalid'
      }
    })
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set({ name, value, ...options })
          )
        },
      },
    }
  )

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
    console.error('Error:', error)
    return NextResponse.redirect(new URL('/auth/auth-error', request.url))
  }
}