import { redirect } from 'next/navigation'
import { createServer } from '@/utils/supabase/server'

export default async function Dashboard() {
  const supabase = await createServer()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return redirect('/signup')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
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