-- Enable RLS
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."organization_members" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."subscription_tiers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."token_transactions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user_roles" ENABLE ROW LEVEL SECURITY;

-- Profile policies
CREATE POLICY "Users can view their own profile"
ON "public"."profiles"
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON "public"."profiles"
FOR UPDATE
USING (auth.uid() = id);

-- Organization policies
CREATE POLICY "Organization members can view their organizations"
ON "public"."organizations"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM organization_members 
    WHERE organization_members.organization_id = organizations.id 
    AND organization_members.user_id = auth.uid()
  )
);

CREATE POLICY "Organization admins can update organization details"
ON "public"."organizations"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.organization_id = organizations.id 
    AND user_roles.user_id = auth.uid()
    AND user_roles.role_id IN (
      SELECT id FROM roles WHERE name = 'admin'
    )
  )
);

-- Organization members policies
CREATE POLICY "Users can view organizations they're members of"
ON "public"."organization_members"
FOR SELECT
USING (user_id = auth.uid());

-- Subscription tiers policies
CREATE POLICY "Anyone can view subscription tiers"
ON "public"."subscription_tiers"
FOR SELECT
TO authenticated
USING (true);

-- Token transactions policies
CREATE POLICY "Users can view their own transactions"
ON "public"."token_transactions"
FOR SELECT
USING (user_id = auth.uid());

-- User roles policies
CREATE POLICY "Only admins can manage user roles"
ON "public"."user_roles"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid()
    AND r.name = 'admin'
    AND ur.organization_id = user_roles.organization_id
  )
);

-- Add minimal INSERT policies needed for onboarding
CREATE POLICY "Authenticated users can create organizations"
ON "public"."organizations"
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can be added to organizations"
ON "public"."organization_members"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can be assigned roles"
ON "public"."user_roles"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT ON "public"."subscription_tiers" TO authenticated;
GRANT SELECT, UPDATE ON "public"."profiles" TO authenticated;
GRANT SELECT ON "public"."organizations" TO authenticated; 