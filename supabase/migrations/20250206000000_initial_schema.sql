-- Create types
CREATE TYPE onboarding_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Create base tables
CREATE TABLE "public"."subscription_tiers" (
    "id" text PRIMARY KEY,
    "name" text NOT NULL,
    "description" text,
    "price" numeric NOT NULL,
    "features" jsonb NOT NULL DEFAULT '[]'::jsonb,
    "created_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "public"."organizations" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" text NOT NULL,
    "type" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now(),
    "subscription_tier" text REFERENCES subscription_tiers(id),
    "status" text DEFAULT 'active'::text,
    "updated_at" timestamp with time zone DEFAULT now(),
    "updated_by" uuid REFERENCES auth.users(id)
);

CREATE TABLE "public"."profiles" (
    "id" uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    "created_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "email" text NOT NULL,
    "first_name" text,
    "last_name" text,
    "ai_requests_count" integer DEFAULT 0,
    "storage_used" bigint DEFAULT 0,
    "video_analysis_count" integer DEFAULT 0,
    "last_login" timestamp with time zone,
    "tokens_available" integer DEFAULT 0,
    "tokens_used" integer DEFAULT 0,
    "organization_id" uuid REFERENCES organizations(id),
    "onboarding_status" onboarding_status DEFAULT 'not_started'
);

CREATE TABLE "public"."roles" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" text NOT NULL,
    "permissions" jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE "public"."organization_members" (
    "user_id" uuid REFERENCES auth.users(id),
    "organization_id" uuid REFERENCES organizations(id),
    "joined_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (user_id, organization_id)
);

CREATE TABLE "public"."user_roles" (
    "user_id" uuid REFERENCES auth.users(id),
    "role_id" uuid REFERENCES roles(id),
    "organization_id" uuid REFERENCES organizations(id),
    PRIMARY KEY (user_id, organization_id)
);

CREATE TABLE "public"."token_transactions" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" uuid REFERENCES profiles(id),
    "amount" integer NOT NULL,
    "cost" numeric(10,2) NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    "payment_id" text,
    "transaction_type" text
);

-- Create indexes
CREATE EXTENSION IF NOT EXISTS citext;
CREATE UNIQUE INDEX idx_organizations_name ON public.organizations((lower(name)));
CREATE INDEX idx_organizations_subscription_tier ON public.organizations(subscription_tier);
CREATE INDEX idx_profiles_last_login ON public.profiles(last_login);
CREATE INDEX idx_token_transactions_user_id ON public.token_transactions(user_id);

-- Add unique constraint on role names
ALTER TABLE public.roles ADD CONSTRAINT unique_role_name UNIQUE (name);

-- Insert default roles matching RoleStep.tsx
INSERT INTO public.roles (id, name, permissions) VALUES
  (gen_random_uuid(), 'admin', '{
    "all": true,
    "description": "Full access to manage organization, users, and video analysis settings"
  }'::jsonb),
  (gen_random_uuid(), 'researcher', '{
    "upload": true,
    "analyze": true,
    "report": true,
    "description": "Can upload videos, conduct analysis, and generate behavioral reports"
  }'::jsonb),
  (gen_random_uuid(), 'animal_care', '{
    "view": true,
    "notes": true,
    "download": true,
    "description": "Can view analysis, add notes, and download behavioral reports"
  }'::jsonb),
  (gen_random_uuid(), 'viewer', '{
    "view": true,
    "description": "View-only access to analysis results and reports"
  }'::jsonb)
ON CONFLICT (name) DO UPDATE SET 
  permissions = EXCLUDED.permissions;

-- Insert default subscription tiers matching lib/data/pricing.ts
INSERT INTO public.subscription_tiers (id, name, description, price, features) VALUES
  ('free', 'Free Trial', 'Basic video analysis and standard reports', 0, 
    '[
      "Basic video analysis",
      "Standard reports",
      "Up to 3 team members",
      "5GB shared storage"
    ]'::jsonb),
  ('professional', 'Professional', 'Advanced features for professionals', 299, 
    '[
      "Advanced video analysis",
      "Priority support",
      "Custom reports",
      "Up to 25 team members",
      "100GB shared storage",
      "Data export"
    ]'::jsonb),
  ('enterprise', 'Enterprise', 'Custom solutions for organizations', 999, 
    '[
      "Unlimited team members",
      "1TB shared storage",
      "API access",
      "Custom AI training",
      "Dedicated support",
      "Advanced analytics",
      "Priority feature requests"
    ]'::jsonb)
ON CONFLICT (id) DO NOTHING; 