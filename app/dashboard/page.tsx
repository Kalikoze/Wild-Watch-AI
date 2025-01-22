import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/types/supabase'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient<Database>(
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

  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    console.log('No session found, redirecting to signup', { error })
    return redirect('/signup')
  }

  // Fetch the user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <div className="min-h-screen bg-primary p-8">
      <h1 className="text-2xl text-neutral-light mb-4">Welcome to your Dashboard</h1>
      {profile && (
        <div className="bg-primary-light p-6 rounded-lg shadow-lg">
          <p className="text-neutral-light">Email: {profile.email}</p>
          <p className="text-neutral-light">Subscription: {profile.subscription_tier}</p>
          <p className="text-neutral-light">AI Requests: {profile.ai_requests_count}</p>
        </div>
      )}
    </div>
  )
} 