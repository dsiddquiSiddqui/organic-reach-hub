# Organic Reach HUB

A custom Next.js 16 marketing site and Supabase-backed content and lead dashboard.

## Local development

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the site URL, Supabase project URL and publishable key.
3. The Organic Reach HUB Supabase project (`zirlpgemlglbvxedfhpu`, London region) has been created and both migrations in `supabase/migrations/` have been applied. The local `.env.local` already points to it. Apply the migrations only when setting up another project.
4. Create an Auth user in the Supabase dashboard. Grant that user dashboard access with:

   ```sql
   insert into public.profiles (id, email, role)
   values ('AUTH_USER_UUID', 'you@example.com', 'admin');
   ```

5. Run `npm run dev`. Visit `/admin/login` to manage content and enquiries.

The Auth UUID must be copied from the new user in Supabase. Public sign-up is intentionally disabled; admin access is granted only by a database administrator. Never put a Supabase secret or service role key in a `NEXT_PUBLIC_` variable.

## Verification

`npm run build`, `npm run lint` and `npm run typecheck` validate the application. Public pages display six bundled articles before Supabase is configured. The migration seeds those six posts for the connected site.

## Publishing checklist

- Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain and add the Supabase URL and publishable key to hosting environment variables.
- Apply the migration and create an admin profile.
- Set the production domain and redirect URLs in Supabase Auth settings.
- Review the privacy, terms and cookie pages with your legal details before launch.
- Test a real enquiry end to end in the connected Supabase project.

The public packages page describes the scope without displaying fees. Package enquiries open the contact form with the relevant package selected. Advertising spend is paid directly to Google or Meta.
