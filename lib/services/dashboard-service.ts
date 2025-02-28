import { createServer } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  organization_id?: string;
  created_at?: string;
  updated_at?: string;
  ai_requests_count: number;
}

export interface Organization {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  logo_url?: string;
  subscription_tier?: string;
}

export type ProfileWithOrganization = {
  profile: Profile;
  organization: Organization | null;
}

export async function fetchDashboardData(user: User): Promise<ProfileWithOrganization | null> {
  const supabase = await createServer()

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    console.error('Error fetching profile:', profileError)
    return null
  }

  let organization = null
  if (profile.organization_id) {
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', profile.organization_id)
      .single()

    if (!orgError) {
      organization = orgData
    } else {
      console.error('Error fetching organization:', orgError)
    }
  }

  return { profile, organization }
} 