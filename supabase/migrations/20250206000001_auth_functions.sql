-- Create user management functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    ai_requests_count,
    storage_used,
    video_analysis_count,
    tokens_available,
    tokens_used,
    onboarding_status
  ) VALUES (
    NEW.id,
    NEW.email,
    0,
    0,
    0,
    0,
    0,
    'not_started'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_onboarding(
  p_user_id uuid,
  p_org_name text,
  p_org_type text,
  p_subscription_tier text,
  p_role_id uuid
)
RETURNS void
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
DECLARE
  v_org_id uuid;
BEGIN
  -- Check if organization already exists (case insensitive)
  IF EXISTS (
    SELECT 1 FROM public.organizations 
    WHERE lower(name) = lower(trim(p_org_name))
    AND type = p_org_type
  ) THEN
    RAISE EXCEPTION 'An organization with name "%" already exists', p_org_name;
  END IF;

  -- Create organization
  INSERT INTO public.organizations (
    name,
    type,
    subscription_tier,
    status,
    updated_by
  ) VALUES (
    trim(p_org_name),
    p_org_type,
    COALESCE(p_subscription_tier, 'free'),
    'active',
    p_user_id
  ) RETURNING id INTO v_org_id;

  -- Create organization membership and role
  INSERT INTO public.organization_members (user_id, organization_id)
  VALUES (p_user_id, v_org_id);

  INSERT INTO public.user_roles (user_id, organization_id, role_id)
  VALUES (p_user_id, v_org_id, p_role_id);

  -- Update user's organization and onboarding status
  UPDATE public.profiles
  SET 
    organization_id = v_org_id,
    onboarding_status = 'completed'
  WHERE id = p_user_id;
END;
$$;

-- Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 