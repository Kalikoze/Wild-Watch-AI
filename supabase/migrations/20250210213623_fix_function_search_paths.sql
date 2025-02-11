DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_new_user_signup();
DROP TRIGGER IF EXISTS on_profile_onboarding_update ON public.profiles;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = ''  -- Set empty search path
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS trigger
SECURITY DEFINER
SET search_path = ''  -- Set empty search path
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
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
SET search_path = ''  -- Fix the search_path warning
LANGUAGE plpgsql
AS $$
BEGIN

END;
$$;

-- Rename and fix the trigger function
CREATE OR REPLACE FUNCTION public.handle_onboarding_status()
RETURNS trigger
SECURITY DEFINER
SET search_path = ''  -- Fix the search_path warning
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update the profile with onboarding status
  UPDATE public.profiles
  SET 
    onboarding_status = NEW.onboarding_status,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.id;

  -- If onboarding is completed, ensure organization relationships are set
  IF NEW.onboarding_status = 'completed' THEN
    -- Additional onboarding completion logic will go here
    -- For example, setting up default organization roles, etc.
    NULL;
  END IF;

  RETURN NEW;
END;
$$;

-- Recreate the trigger with the renamed function
CREATE TRIGGER on_profile_onboarding_update
  AFTER UPDATE OF onboarding_status ON public.profiles
  FOR EACH ROW
  WHEN (OLD.onboarding_status IS DISTINCT FROM NEW.onboarding_status)
  EXECUTE FUNCTION public.handle_onboarding_status();
