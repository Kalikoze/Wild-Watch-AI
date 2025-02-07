create type "public"."onboarding_status" as enum ('not_started', 'in_progress', 'completed');

create table "public"."organization_members" (
    "user_id" uuid not null,
    "organization_id" uuid not null,
    "joined_at" timestamp with time zone default now()
);


create table "public"."organizations" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "type" text not null,
    "created_at" timestamp with time zone default now(),
    "subscription_tier" text,
    "status" text default 'active'::text,
    "updated_at" timestamp with time zone default now(),
    "updated_by" uuid,
    "name_lower" text generated always as (lower(name)) stored
);


create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "email" text not null,
    "first_name" text,
    "last_name" text,
    "ai_requests_count" integer default 0,
    "subscription_tier" text default 'free'::text,
    "storage_used" bigint default 0,
    "video_analysis_count" integer default 0,
    "last_login" timestamp with time zone,
    "tokens_available" integer default 0,
    "tokens_used" integer default 0,
    "organization_id" uuid,
    "onboarding_status" text default 'pending'::text
);


alter table "public"."profiles" enable row level security;

create table "public"."roles" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "permissions" jsonb not null default '{}'::jsonb
);


create table "public"."subscription_tiers" (
    "id" text not null,
    "name" text not null,
    "description" text,
    "price" numeric not null,
    "features" jsonb not null default '[]'::jsonb,
    "created_at" timestamp with time zone default now()
);


create table "public"."token_transactions" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid,
    "amount" integer not null,
    "cost" numeric(10,2) not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "payment_id" text,
    "transaction_type" text
);


create table "public"."user_roles" (
    "user_id" uuid not null,
    "role_id" uuid,
    "organization_id" uuid not null
);


CREATE UNIQUE INDEX idx_organizations_name_type ON public.organizations USING btree (name_lower, type);

CREATE INDEX idx_organizations_subscription_tier ON public.organizations USING btree (subscription_tier);

CREATE INDEX idx_profiles_last_login ON public.profiles USING btree (last_login);

CREATE INDEX idx_token_transactions_user_id ON public.token_transactions USING btree (user_id);

CREATE UNIQUE INDEX organization_members_pkey ON public.organization_members USING btree (user_id, organization_id);

CREATE UNIQUE INDEX organizations_pkey ON public.organizations USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX subscription_tiers_pkey ON public.subscription_tiers USING btree (id);

CREATE UNIQUE INDEX token_transactions_pkey ON public.token_transactions USING btree (id);

CREATE UNIQUE INDEX unique_organization_name ON public.organizations USING btree (name_lower);

CREATE UNIQUE INDEX user_roles_pkey ON public.user_roles USING btree (user_id, organization_id);

alter table "public"."organization_members" add constraint "organization_members_pkey" PRIMARY KEY using index "organization_members_pkey";

alter table "public"."organizations" add constraint "organizations_pkey" PRIMARY KEY using index "organizations_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."subscription_tiers" add constraint "subscription_tiers_pkey" PRIMARY KEY using index "subscription_tiers_pkey";

alter table "public"."token_transactions" add constraint "token_transactions_pkey" PRIMARY KEY using index "token_transactions_pkey";

alter table "public"."user_roles" add constraint "user_roles_pkey" PRIMARY KEY using index "user_roles_pkey";

alter table "public"."organization_members" add constraint "organization_members_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."organization_members" validate constraint "organization_members_organization_id_fkey";

alter table "public"."organization_members" add constraint "organization_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."organization_members" validate constraint "organization_members_user_id_fkey";

alter table "public"."organizations" add constraint "organizations_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'suspended'::text, 'deleted'::text]))) not valid;

alter table "public"."organizations" validate constraint "organizations_status_check";

alter table "public"."organizations" add constraint "organizations_subscription_tier_fkey" FOREIGN KEY (subscription_tier) REFERENCES subscription_tiers(id) not valid;

alter table "public"."organizations" validate constraint "organizations_subscription_tier_fkey";

alter table "public"."organizations" add constraint "organizations_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) not valid;

alter table "public"."organizations" validate constraint "organizations_updated_by_fkey";

alter table "public"."organizations" add constraint "unique_organization_name" UNIQUE using index "unique_organization_name";

alter table "public"."profiles" add constraint "check_counts_positive" CHECK (((ai_requests_count >= 0) AND (video_analysis_count >= 0) AND (tokens_available >= 0) AND (tokens_used >= 0) AND (storage_used >= 0))) not valid;

alter table "public"."profiles" validate constraint "check_counts_positive";

alter table "public"."profiles" add constraint "positive_storage" CHECK ((storage_used >= 0)) not valid;

alter table "public"."profiles" validate constraint "positive_storage";

alter table "public"."profiles" add constraint "positive_tokens" CHECK ((tokens_available >= 0)) not valid;

alter table "public"."profiles" validate constraint "positive_tokens";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_onboarding_status_check" CHECK ((onboarding_status = ANY (ARRAY['pending'::text, 'in_progress'::text, 'completed'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_onboarding_status_check";

alter table "public"."profiles" add constraint "profiles_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."profiles" validate constraint "profiles_organization_id_fkey";

alter table "public"."token_transactions" add constraint "token_transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."token_transactions" validate constraint "token_transactions_user_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."user_roles" validate constraint "user_roles_organization_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) not valid;

alter table "public"."user_roles" validate constraint "user_roles_role_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_roles" validate constraint "user_roles_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    -- Create a minimal profile for the user
    INSERT INTO public.profiles (
        id,
        email,
        ai_requests_count,
        storage_used,
        video_analysis_count,
        tokens_available,
        tokens_used,
        onboarding_status      -- Add this field
    ) VALUES (
        NEW.id,
        NEW.email,
        0,
        0,
        0,
        0,
        0,
        'pending'              -- Set initial status
    );

    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error creating initial user profile: %', SQLERRM;
    RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_onboarding(p_user_id uuid, p_org_name text, p_org_type text, p_subscription_tier text, p_role_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  v_org_id uuid;
  v_existing_org organizations%rowtype;
begin
  -- Check if organization already exists (case insensitive)
  select * into v_existing_org
  from organizations
  where lower(name) = lower(p_org_name) and type = p_org_type;
  
  if found then
    raise exception 'An organization with name "%" and type "%" already exists', 
      p_org_name, p_org_type;
  end if;

  -- Validate organization name
  if length(trim(p_org_name)) < 2 then
    raise exception 'Organization name must be at least 2 characters long';
  end if;
  
  if length(trim(p_org_name)) > 100 then
    raise exception 'Organization name must not exceed 100 characters';
  end if;

  -- Create organization with sanitized input
  insert into organizations (
    name,
    type,
    subscription_tier,
    status,
    created_at
  ) values (
    trim(p_org_name), -- Remove leading/trailing whitespace
    p_org_type,
    p_subscription_tier,
    'active',
    now()
  ) returning id into v_org_id;

  -- Rest of the function remains the same...
end;
$function$
;

grant delete on table "public"."organization_members" to "anon";

grant insert on table "public"."organization_members" to "anon";

grant references on table "public"."organization_members" to "anon";

grant select on table "public"."organization_members" to "anon";

grant trigger on table "public"."organization_members" to "anon";

grant truncate on table "public"."organization_members" to "anon";

grant update on table "public"."organization_members" to "anon";

grant delete on table "public"."organization_members" to "authenticated";

grant insert on table "public"."organization_members" to "authenticated";

grant references on table "public"."organization_members" to "authenticated";

grant select on table "public"."organization_members" to "authenticated";

grant trigger on table "public"."organization_members" to "authenticated";

grant truncate on table "public"."organization_members" to "authenticated";

grant update on table "public"."organization_members" to "authenticated";

grant delete on table "public"."organization_members" to "service_role";

grant insert on table "public"."organization_members" to "service_role";

grant references on table "public"."organization_members" to "service_role";

grant select on table "public"."organization_members" to "service_role";

grant trigger on table "public"."organization_members" to "service_role";

grant truncate on table "public"."organization_members" to "service_role";

grant update on table "public"."organization_members" to "service_role";

grant delete on table "public"."organizations" to "anon";

grant insert on table "public"."organizations" to "anon";

grant references on table "public"."organizations" to "anon";

grant select on table "public"."organizations" to "anon";

grant trigger on table "public"."organizations" to "anon";

grant truncate on table "public"."organizations" to "anon";

grant update on table "public"."organizations" to "anon";

grant delete on table "public"."organizations" to "authenticated";

grant insert on table "public"."organizations" to "authenticated";

grant references on table "public"."organizations" to "authenticated";

grant select on table "public"."organizations" to "authenticated";

grant trigger on table "public"."organizations" to "authenticated";

grant truncate on table "public"."organizations" to "authenticated";

grant update on table "public"."organizations" to "authenticated";

grant delete on table "public"."organizations" to "service_role";

grant insert on table "public"."organizations" to "service_role";

grant references on table "public"."organizations" to "service_role";

grant select on table "public"."organizations" to "service_role";

grant trigger on table "public"."organizations" to "service_role";

grant truncate on table "public"."organizations" to "service_role";

grant update on table "public"."organizations" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."subscription_tiers" to "anon";

grant insert on table "public"."subscription_tiers" to "anon";

grant references on table "public"."subscription_tiers" to "anon";

grant select on table "public"."subscription_tiers" to "anon";

grant trigger on table "public"."subscription_tiers" to "anon";

grant truncate on table "public"."subscription_tiers" to "anon";

grant update on table "public"."subscription_tiers" to "anon";

grant delete on table "public"."subscription_tiers" to "authenticated";

grant insert on table "public"."subscription_tiers" to "authenticated";

grant references on table "public"."subscription_tiers" to "authenticated";

grant select on table "public"."subscription_tiers" to "authenticated";

grant trigger on table "public"."subscription_tiers" to "authenticated";

grant truncate on table "public"."subscription_tiers" to "authenticated";

grant update on table "public"."subscription_tiers" to "authenticated";

grant delete on table "public"."subscription_tiers" to "service_role";

grant insert on table "public"."subscription_tiers" to "service_role";

grant references on table "public"."subscription_tiers" to "service_role";

grant select on table "public"."subscription_tiers" to "service_role";

grant trigger on table "public"."subscription_tiers" to "service_role";

grant truncate on table "public"."subscription_tiers" to "service_role";

grant update on table "public"."subscription_tiers" to "service_role";

grant delete on table "public"."token_transactions" to "anon";

grant insert on table "public"."token_transactions" to "anon";

grant references on table "public"."token_transactions" to "anon";

grant select on table "public"."token_transactions" to "anon";

grant trigger on table "public"."token_transactions" to "anon";

grant truncate on table "public"."token_transactions" to "anon";

grant update on table "public"."token_transactions" to "anon";

grant delete on table "public"."token_transactions" to "authenticated";

grant insert on table "public"."token_transactions" to "authenticated";

grant references on table "public"."token_transactions" to "authenticated";

grant select on table "public"."token_transactions" to "authenticated";

grant trigger on table "public"."token_transactions" to "authenticated";

grant truncate on table "public"."token_transactions" to "authenticated";

grant update on table "public"."token_transactions" to "authenticated";

grant delete on table "public"."token_transactions" to "service_role";

grant insert on table "public"."token_transactions" to "service_role";

grant references on table "public"."token_transactions" to "service_role";

grant select on table "public"."token_transactions" to "service_role";

grant trigger on table "public"."token_transactions" to "service_role";

grant truncate on table "public"."token_transactions" to "service_role";

grant update on table "public"."token_transactions" to "service_role";

grant delete on table "public"."user_roles" to "anon";

grant insert on table "public"."user_roles" to "anon";

grant references on table "public"."user_roles" to "anon";

grant select on table "public"."user_roles" to "anon";

grant trigger on table "public"."user_roles" to "anon";

grant truncate on table "public"."user_roles" to "anon";

grant update on table "public"."user_roles" to "anon";

grant delete on table "public"."user_roles" to "authenticated";

grant insert on table "public"."user_roles" to "authenticated";

grant references on table "public"."user_roles" to "authenticated";

grant select on table "public"."user_roles" to "authenticated";

grant trigger on table "public"."user_roles" to "authenticated";

grant truncate on table "public"."user_roles" to "authenticated";

grant update on table "public"."user_roles" to "authenticated";

grant delete on table "public"."user_roles" to "service_role";

grant insert on table "public"."user_roles" to "service_role";

grant references on table "public"."user_roles" to "service_role";

grant select on table "public"."user_roles" to "service_role";

grant trigger on table "public"."user_roles" to "service_role";

grant truncate on table "public"."user_roles" to "service_role";

grant update on table "public"."user_roles" to "service_role";

create policy "Users can update own profile"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view own profile"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));



