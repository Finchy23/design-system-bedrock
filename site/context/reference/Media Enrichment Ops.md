# Media Enrichment (Supabase) — Ops Guide

Purpose
- Keep dashboard-assets enriched with metadata (dimensions, content-type normalization, tags) via Supabase Function `media-enricher`.

Endpoints
- POST /media-enricher/backfill?bucket=dashboard-assets[&prefix=...&limit=...]
- POST /media-enricher/cron (optional scheduled trigger)
- (Optional) POST /media-enricher/enrich { bucket, path } for ad-hoc single-object runs if implemented.

Auth
- User flows: Supabase Auth JWT (anon key in client, user session token in header).
- Admin/server: service role key in Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY> (never in client).

Environment
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (server-only)

Data + RLS
- Tracking table (expected): public.media_enrich_runs with id, started_at, status, total_files, processed_files, succeeded, failed.
- Index and policy for tenant safety: index on (bucket, path) and tenant keys; RLS to restrict reads to owning tenant/user.

UI / Process (Console → Admin-only)
- Add an admin-only control to trigger backfill with optional prefix/limit.
- Show toast on kickoff; poll media_enrich_runs for status; display latest run + history.
- For bulk runs, prefer server-side trigger (service role) behind RBAC.

UI stub (framework-agnostic)
- POST trigger: fetch(`${SUPABASE_URL}/functions/v1/media-enricher/backfill?bucket=${bucket}&prefix=${prefix}&limit=${limit}`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: '{}' })
- Poll status: SELECT id, started_at, status, total_files, processed_files, succeeded, failed FROM media_enrich_runs ORDER BY started_at DESC LIMIT 20;
- Render: latest run card (status, processed/total, succeeded/failed) + list of recent runs. Button disabled while in-flight; show errors.

Monitoring
- Supabase Functions logs: media-enricher function.
- Table view: select id, started_at, status, total_files, processed_files, succeeded, failed from public.media_enrich_runs order by started_at desc limit 20;

Error handling
- 401/403: missing/invalid token → re-auth or use server key for admin flow.
- 429: back off and retry.
- 5xx: show friendly message, allow retry with backoff.

Rollout steps
1) Confirm tracking table schema exists; add indexes + RLS.
2) Wire env vars in runtime and CI.
3) Ship admin-only UI in Console; guard by role/tenant.
4) Add a small runbook entry in ops docs (this file) and link from IA/Settings.

Reference
- Detailed handler: context/reference/Supabase Asset Handler 2e15a0fd01ef807c9d4bdafbc822b84e.md
