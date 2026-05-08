# in-vest

Personal investment thesis tracker. Pulls portfolio data from Schwab, lets you author "themes" (investment theses), and uses Claude to update them on a weekly schedule.

This repo is currently a **scaffold** — the platform pieces are wired up, but Schwab, Claude, and the theme/portfolio UIs are stubs.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind v4
- **shadcn/ui** for components
- **Supabase** for the database (Postgres, Auth)
- **Vercel AI Gateway** for Claude (`anthropic/claude-opus-4-7`)
- **Schwab API** (stubbed — requires developer.schwab.com approval)
- Deployed on **Vercel** (Fluid Compute, Node.js 24)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # leave Schwab/Claude vars empty for now
npm run dev
```

Open http://localhost:3000.

Routes:
- `/` — dashboard
- `/themes` — theme list (placeholder)
- `/portfolio` — portfolio view (placeholder)
- `GET /api/health` — sanity check
- `GET /api/schwab/portfolio` — returns 501 until Schwab is wired up
- `POST /api/claude/update-themes` — returns 501 until the weekly flow is implemented

## What's stubbed

| Module | File | Status |
|---|---|---|
| Schwab client | `lib/schwab/client.ts` | Config check + typed shapes; OAuth flow not implemented |
| Claude client | `lib/ai/gateway.ts` | Connects via Vercel AI Gateway; no prompts written yet |
| Supabase clients | `lib/supabase/{client,server}.ts` | Wired but no project provisioned |
| DB schema | `supabase/migrations/0001_init.sql` | Tables defined; no RLS or seed |
| Weekly cron | `vercel.ts` | Cron entry written but commented out |

## Next steps

1. Provision Supabase via Vercel Marketplace (`/marketplace` → Supabase).
2. Run `supabase db push` to apply the initial migration.
3. Get Schwab developer credentials and implement the OAuth callback at `app/api/schwab/callback/route.ts`.
4. Build the theme authoring UI on `/themes`.
5. Implement the weekly Claude flow in `app/api/claude/update-themes/route.ts` and uncomment the cron in `vercel.ts`.

## Auth note

This is a single-user app. There's no sign-in UI yet — adding Supabase Auth is on the to-do list.
