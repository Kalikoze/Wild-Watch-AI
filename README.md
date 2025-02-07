# WildWatch AI

A Next.js application for wildlife professionals and sanctuary staff.

## Prerequisites

- Node.js 18+ and npm
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Docker (for local Supabase)

## Environment Setup

1. Clone the repository
```bash
git clone git@github.com:Kalikoze/WildWatch-AI.git
cd wildwatch-ai
```

2. Install dependencies
```bash
npm install
```

3. Create environment files:

`.env.local` for local development:
```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AZURE_CLIENT_ID=your-azure-client-id
AZURE_CLIENT_SECRET=your-azure-client-secret
SUPABASE_TEST_REF=your-test-stage-ref
SUPABASE_PROD_REF=your-production-ref
```

## Local Development

1. Start the local Supabase instance and Next.js development server:
```bash
npm run dev:local
```

2. Access local services:
- Application: [http://localhost:3000](http://localhost:3000)
- Supabase Studio: [http://localhost:54323](http://localhost:54323)
- Email Testing: [http://localhost:54324](http://localhost:54324)

Quick access commands:
```bash
npm run studio:view  # Open Supabase Studio
npm run mail:view   # Open Email Viewer
```

## Database Management

### Migrations
Create a new migration:
```bash
supabase migration new your_migration_name
```

Apply migrations:
```bash
supabase db reset
```

### Linking to Remote Environments

The project uses three environments:
- Local (development)
- Test/Staging (combined)
- Production

To link to remote environments:
```bash
# For testing/staging
npm run db:link-test

# For production
npm run db:link-prod
```

To push database changes:
```bash
# For testing/staging
npm run db:push-test

# For production
npm run db:push-prod
```

## Authentication

The application supports:
- Magic Link (Email)
- Google OAuth
- Microsoft OAuth

For local development:
1. Magic link emails can be viewed at [http://localhost:54324](http://localhost:54324)
2. OAuth requires configuration in Google Cloud Console and Azure Portal
3. Add callback URLs to your OAuth providers:
   - Local: `http://localhost:3000/auth/callback`
   - Test/Stage: `https://staging.wildwatch.ai/auth/callback`
   - Production: `https://wildwatch.ai/auth/callback`

## Available Scripts

```bash
# Development
npm run dev          # Start Next.js development server
npm run dev:local    # Start Supabase and Next.js

# Supabase
npm run supabase:start   # Start local Supabase
npm run supabase:stop    # Stop local Supabase
npm run supabase:status  # Check Supabase status

# Database
npm run db:backup-config   # Backup local config
npm run db:restore-config  # Restore local config
npm run db:clean-config    # Clean config for remote
npm run db:link-test      # Link to staging environment
npm run db:link-prod      # Link to production environment
npm run db:push-test      # Push to staging environment
npm run db:push-prod      # Push to production environment

# Testing
npm run test        # Run tests
npm run test:ui     # Run tests with UI
npm run type-check  # Run TypeScript checks
```

## Project Structure

```
wildwatch-ai/
├── app/                  # Next.js application code
├── supabase/            # Supabase configuration
│   ├── migrations/      # Database migrations
│   └── config.toml      # Supabase configuration
├── .env.local           # Local environment variables
└── package.json         # Project dependencies and scripts
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Push to testing/staging environment for verification
5. Create a pull request

## Deployment

The application uses a staged deployment process:
1. Local development
2. Testing/Staging environment for verification
3. Production deployment

Ensure all environment variables are properly set in each environment.
