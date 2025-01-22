import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')

  if (!token_hash) {
    console.log('No token hash found')
    return NextResponse.redirect(new URL('/auth/auth-error', request.url))
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStore.delete(name, options)
        }
      }
    }
  )

  try {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any
    })

    if (error) throw error

    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.redirect(new URL('/auth/auth-error', request.url))
  }
}