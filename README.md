# Scrub Squad

React + Vite storefront for Scrub King and Scrub Queen, with Supabase for orders, catalog, and admin.

## Local development

```bash
npm install
npm run dev
```

Without Supabase env vars, the app runs in demo mode with static catalog data and client-only checkout.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local` and add your project URL and anon key.
3. Run the schema and seed in the Supabase SQL editor:
   - [`supabase/migrations/001_initial_schema.sql`](supabase/migrations/001_initial_schema.sql)
   - [`supabase/migrations/002_order_purge_and_revenue.sql`](supabase/migrations/002_order_purge_and_revenue.sql)
   - [`supabase/seed.sql`](supabase/seed.sql)
4. Create an admin user in **Authentication → Users**.
5. Deploy the order notification function:

```bash
npx supabase functions deploy notify-order
npx supabase secrets set RESEND_API_KEY=your_key NOTIFY_EMAIL=you@example.com
```

## Admin

Sign in at `/admin/login` with your Supabase admin user to manage orders and products.

## Deploy on Vercel

`.env.local` is gitignored and **never** uploaded to GitHub or Vercel. For production:

1. Open [Vercel Dashboard](https://vercel.com) → your project → **Settings** → **Environment Variables**.
2. Add these (exact names — Vite requires the `VITE_` prefix):

   | Name | Value |
   |------|--------|
   | `VITE_SUPABASE_URL` | Your Supabase project URL |
   | `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key |

3. Enable them for **Production** (and Preview if you want admin on preview URLs).
4. **Redeploy** — Vite bakes env vars at build time, so a new deploy is required after adding or changing variables.

Find values in Supabase → **Project Settings** → **API**.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run Oxlint
