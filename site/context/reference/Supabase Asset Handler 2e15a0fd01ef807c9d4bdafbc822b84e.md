# Supabase Asset Handler

## **Frontend handoff: Media Enricher backfill and usage**

Below is everything your frontend devs need to integrate, trigger, and monitor the media-enricher flow securely.

---

## **1) Endpoints**

Base URL

- https://wzeqlkbmqxlsjryidagf.functions.supabase.co

Routes

- POST /media-enricher/backfill?bucket=dashboard-assets
    - Triggers a background backfill of existing files in the specified bucket.
    - Query params:
        - bucket: string (required). Example: dashboard-assets
        - prefix: string (optional) — only process files under this prefix
        - limit: number (optional) — process up to N files this run
    - Body: {}
    - Auth: Requires authenticated user. For server-side (service worker/CRON), use the service role key. For client-side, use the user session JWT.
- POST /media-enricher/cron?bucket=dashboard-assets
    - Lightweight health or scheduled run endpoint if you wire it to Supabase Scheduled Triggers later.
    - Same query params and auth expectations as backfill.
- Optional per-object enrichment (if implemented in your function):
    - POST /media-enricher/enrich
        - Body: { bucket: string; path: string }
        - Use for ad-hoc enrichment on a single file.

Note: If “enrich” isn’t implemented today, keep the interface above consistent when adding it.

---

## **2) Authentication**

Client-side usage with user sessions

- The Functions endpoint accepts the user’s JWT from Supabase Auth automatically via the supabase-js client.
- Ensure the user has permissions (RLS/Policies) to access the bucket or related tables.

Server-side usage (recommended for bulk runs)

- Use the service role key to call the function from a trusted server.
- Add an Authorization header:
    - Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>

Security notes

- Do not expose the service role key in client-side code.
- Prefer invoking backfill from an admin-only screen or from the server.

---

## **3) Example code snippets**

Using supabase-js (client side)

```tsx
import { createClient }from'@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
// Trigger backfill (user must be authenticated)
exportasyncfunctiontriggerBackfill(bucket ='dashboard-assets'){
const res =await fetch(
`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/media-enricher/backfill?bucket=${encodeURIComponent(bucket)}`,
    {
method:'POST',
headers: {
Authorization:`Bearer${(await supabase.auth.getSession()).data.session?.access_token ??''}`,
'Content-Type':'application/json',
      },
body:JSON.stringify({}),
    }
  )
if (!res.ok)thrownewError(`Backfill failed:${res.status}${await res.text()}`)
return res.json().catch(() => ({}))
}
```

Server-side (Node/Next.js API route, service role)

```tsx
exportdefaultasyncfunctionhandler(req, res){
if (req.method !=='POST')return res.status(405).end()
const url =`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/media-enricher/backfill?bucket=dashboard-assets`
const r =await fetch(url, {
method:'POST',
headers: {
Authorization:`Bearer${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
'Content-Type':'application/json',
    },
body:JSON.stringify({}),
  })
const text =await r.text()
if (!r.ok)return res.status(r.status).send(text)
try { res.status(200).json(JSON.parse(text)) }catch { res.status(200).send(text) }
}
```

curl (manual testing)

- With a logged-in user token: curl -X POST "https://wzeqlkbmqxlsjryidagf.functions.supabase.co/media-enricher/backfill?bucket=dashboard-assets" -H "Authorization: Bearer <USER_JWT>" -H "Content-Type: application/json" -d "{}"
- With service role (server/trusted env only): curl -X POST "https://wzeqlkbmqxlsjryidagf.functions.supabase.co/media-enricher/backfill?bucket=dashboard-assets" -H "Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>" -H "Content-Type: application/json" -d "{}"

---

## **4) Expected responses and logging**

- The function should respond quickly (202/200) and perform the heavy work asynchronously, logging progress.
- Devs should monitor:
    - Supabase Functions > media-enricher > Logs, for runtime output and errors.
    - Optional DB table (if implemented) public.media_enrich_runs to track progress.

SQL to view recent runs (if table exists)

**SQL Query**

```sql
select id, started_at, status, total_files, processed_files, succeeded, failed
from public.media_enrich_runs
orderby started_atdesc
limit20;
```

---

## **5) Storage and metadata expectations**

- Input bucket: dashboard-assets
- The function likely reads objects and writes derived metadata (e.g., width/height, content-type normalization, tags) into:
    - A metadata table like public.media_assets or a JSONB column on your asset records
    - Or Storage object metadata via the Storage API
- Confirm exact schema names/targets with the backend; ensure columns used in RLS have indexes for performance.

---

## **6) Permissions and RLS essentials**

For frontend reads of metadata:

- Ensure SELECT policies permit authenticated users to read their own records.
- Index common filters (e.g., user_id, tenant_id, bucket, path).

Typical pattern (illustrative)

**SQL Query**

```sql
-- Replace table/columns accordingly
altertable public.media_assets enablerow level security;

create policy "user_can_read_own_media"
on public.media_assets
forselectto authenticated
using ((select auth.uid())= user_id);

create index ifnotexists idx_media_assets_useron public.media_assets(user_id);
create index ifnotexists idx_media_assets_bucket_pathon public.media_assets(bucket, path);
```

---

## **7) Frontend UX guidance**

- Provide an “Enrich now” button for admins that hits POST /media-enricher/backfill?bucket=dashboard-assets
- Show a toast on kickoff and a link to a status page
- Poll a status endpoint or query the tracking table to show progress and error counts
- For large buckets, allow optional prefix and limit to scope runs:
    - /media-enricher/backfill?bucket=dashboard-assets&prefix=images/&limit=500

---

## **8) Error handling**

Common causes

- 401/403: Missing or invalid token; ensure user is logged in or use server-side service key.
- 429: Too many concurrent invocations; back off and retry.
- 5xx: Temporary failure; show a friendly message and instruct to retry.

Retry strategy

- Exponential backoff for 5xx and network errors
- Don’t retry automatically on 4xx (fix auth/inputs first)

---

## **9) Environment variables**

Frontend

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Server-side (not exposed to browser)

- SUPABASE_SERVICE_ROLE_KEY

---

## **10) Checklist for the frontend team**

- Wire an admin-only action to POST /media-enricher/backfill with optional prefix/limit params.
- Use user JWT for client flows or service role for server flows.
- Add progress UI by polling a status endpoint or querying the tracking table.
- Confirm RLS allows required reads; ensure relevant indexes exist.
- Test with a small prefix and limit before running on the full bucket.

If you want, I can provide a minimal React component that triggers the backfill and shows basic status next.

perfect - yes please

Reasoned

## **Minimal React component for triggering backfill and showing status**

Assumptions

- You’re using Next.js or React with supabase-js initialized elsewhere.
- A table like public.media_enrich_runs exists for progress. Adjust fields if your schema differs.
- The function responds quickly and logs progress in the DB.

Setup

- Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
- If you want server-triggered runs, wrap the invoke in an API route using the service role (not shown here).

Component

```tsx
import React, { useCallback, useEffect, useMemo, useRef, useState }from'react'
import { createClient }from'@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
type RunRow = {
id:string
started_at:string |null
status:string |null
total_files:number |null
processed_files:number |null
succeeded:number |null
failed:number |null
}
asyncfunctiongetUserToken(){
const { data } =await supabase.auth.getSession()
return data.session?.access_token ??''
}
asyncfunctioninvokeBackfill(bucket:string, prefix?:string, limit?:number){
const base =`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/media-enricher/backfill`
const url =new URL(base)
  url.searchParams.set('bucket', bucket)
if (prefix) url.searchParams.set('prefix', prefix)
if (limit) url.searchParams.set('limit',String(limit))
const token =await getUserToken()
const res =await fetch(url.toString(), {
method:'POST',
headers: {
Authorization:`Bearer${token}`,
'Content-Type':'application/json',
    },
body:JSON.stringify({}),
  })
if (!res.ok) {
const text =await res.text()
thrownewError(`Backfill failed:${res.status}${text}`)
  }
try {
returnawait res.json()
  }catch {
return {}
  }
}
asyncfunctionfetchRecentRuns(limit =20):Promise<RunRow[]>{
const { data, error } =await supabase
    .from('media_enrich_runs')
    .select('id, started_at, status, total_files, processed_files, succeeded, failed')
    .order('started_at', {ascending:false })
    .limit(limit)
if (error)throw error
return data ?? []
}
exportfunctionMediaEnricherAdmin({
  defaultBucket ='dashboard-assets',
  defaultPrefix ='',
}: {
  defaultBucket?:string
  defaultPrefix?:string
}){
const [bucket, setBucket] = useState(defaultBucket)
const [prefix, setPrefix] = useState(defaultPrefix)
const [limit, setLimit] = useState<number |''>('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string |null>(null)
const [runs, setRuns] = useState<RunRow[]>([])
const intervalRef = useRef<number |null>(null)
const pollRuns = useCallback(async () => {
try {
const rows =await fetchRecentRuns(20)
      setRuns(rows)
    }catch (e:any) {
console.error(e)
      setError(e.message ??'Failed to fetch runs')
    }
  }, [])
  useEffect(() => {
// Initial load and polling
    pollRuns()
    intervalRef.current =window.setInterval(pollRuns,5000)
return() => {
if (intervalRef.current) {
clearInterval(intervalRef.current)
        intervalRef.current =null
      }
    }
  }, [pollRuns])
const activeRun = useMemo(() => runs?.[0], [runs])
const handleStart = useCallback(async () => {
    setError(null)
    setLoading(true)
try {
await invokeBackfill(bucket, prefix ||undefined,typeof limit ==='number' ? limit :undefined)
// Give it a moment and refresh
setTimeout(pollRuns,1000)
    }catch (e:any) {
      setError(e.message ??'Failed to start backfill')
    }finally {
      setLoading(false)
    }
  }, [bucket, prefix, limit, pollRuns])
return (
    <div style={{ maxWidth: 720, margin: '16px auto', padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Media Enricher Admin</h2>
      <p>Trigger a backfill on the Storage bucket and monitor recent runs.</p>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr auto' }}>
        <input
          placeholder="Bucket"
          value={bucket}
          onChange={(e) => setBucket(e.target.value)}
        />
        <input
          placeholder="Prefix (optional)"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
        <input
          placeholder="Limit (optional)"
          value={limit}
          onChange={(e) => {
            const v = e.target.value
            if (v === '') setLimit('')
            else {
              const n = Number(v)
              if (!Number.isNaN(n)) setLimit(n)
            }
          }}
        />
        <button onClick={handleStart} disabled={loading}>
          {loading ? 'Starting…' : 'Start backfill'}
        </button>
      </div>
      {error && (
        <div style={{ marginTop: 12, color: 'crimson' }}>
          <strong>Error: </strong>{error}
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <h3>Most Recent Run</h3>
        {activeRun ? (
          <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
            <div><strong>ID:</strong> {activeRun.id}</div>
            <div><strong>Started:</strong> {activeRun.started_at ?? '—'}</div>
            <div><strong>Status:</strong> {activeRun.status ?? '—'}</div>
            <div><strong>Progress:</strong> {activeRun.processed_files ?? 0} / {activeRun.total_files ?? 0}</div>
            <div><strong>Succeeded:</strong> {activeRun.succeeded ?? 0}</div>
            <div><strong>Failed:</strong> {activeRun.failed ?? 0}</div>
          </div>
        ) : (
          <div>No runs found.</div>
        )}
      </div>
      <div style={{ marginTop: 16 }}>
        <h3>Recent Runs</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {runs.map((r) => (
            <li key={r.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div><strong>{r.id}</strong></div>
              <div>Started: {r.started_at ?? '—'}</div>
              <div>Status: {r.status ?? '—'}</div>
              <div>Processed: {r.processed_files ?? 0} / {r.total_files ?? 0} | OK: {r.succeeded ?? 0} | Failed: {r.failed ?? 0}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

Notes and options

- If public.media_enrich_runs is not directly readable by authenticated users, add a safe SELECT policy or proxy via an API route.
- If you prefer server-triggered runs, create an API route that calls the function with the service role key; then the component hits your API route. This avoids relying on the user’s token to authorize the function.
- To reduce client bundle size, consider passing a pre-initialized Supabase client via context instead of creating it in the component.

Want me to provide the minimal API route for server-side invocation and the SQL for a safe read-only policy on media_enrich_runs?

roll it

Reasoned

## **Server-side API route + safe DB policy**

Below are a minimal Next.js API route to invoke the backfill using the service role key, and SQL to set up a read-only, safe SELECT policy for authenticated users to view run status.

## **1) Next.js API route (server-triggered invocation)**

Create pages/api/media-enricher/backfill.ts (Next.js Pages Router) or app/api/media-enricher/backfill/route.ts (App Router). Example for Pages Router:

```tsx
// pages/api/media-enricher/backfill.ts
importtype { NextApiRequest, NextApiResponse }from'next'
exportdefaultasyncfunctionhandler(req: NextApiRequest, res: NextApiResponse){
if (req.method !=='POST')return res.status(405).end('Method Not Allowed')
try {
const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!baseUrl || !serviceKey) {
return res.status(500).send('Missing env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    }
const { bucket ='dashboard-assets', prefix, limit } = req.body ?? {}
const fnUrl =new URL(`${baseUrl}/functions/v1/media-enricher/backfill`)
    fnUrl.searchParams.set('bucket',String(bucket))
if (prefix) fnUrl.searchParams.set('prefix',String(prefix))
if (limit) fnUrl.searchParams.set('limit',String(limit))
const r =await fetch(fnUrl.toString(), {
method:'POST',
headers: {
Authorization:`Bearer${serviceKey}`,
'Content-Type':'application/json',
      },
body:JSON.stringify({}),
    })
const text =await r.text()
if (!r.ok)return res.status(r.status).send(text)
try {
return res.status(200).json(JSON.parse(text))
    }catch {
return res.status(200).send(text)
    }
  }catch (e:any) {
return res.status(500).send(e.message ??'Unknown error')
  }
}
```

Client usage

```tsx
// Example call from your React component
await fetch('/api/media-enricher/backfill', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ bucket: 'dashboard-assets', prefix: 'images/', limit:500 }),
})
```

Security

- This route runs on the server and uses the service role key. Ensure it’s protected in your UI (admin-only).
- Optionally add authentication/authorization checks in the handler before invoking the function.

Env vars (server)

- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_SUPABASE_URL

## **2) Read-only policy for media_enrich_runs**

If your frontend queries public.media_enrich_runs directly, add a safe SELECT policy for authenticated users. Adjust table/columns/tenancy as needed.

**SQL Query**

```sql
-- Enable RLS
altertable public.media_enrich_runs enablerow level security;

-- Grant minimal SELECT
grantselectontable public.media_enrich_runsto authenticated;

-- Read-only policy for all authenticated users
-- Narrow this further by tenant, owner, or role if needed.
create policy "authenticated_can_read_enrich_runs"
on public.media_enrich_runs
forselect
to authenticated
using (true);
```

Optional: restrict by tenant or role if multi-tenant

**SQL Query**

```sql
-- Example if runs are scoped by tenant_id in the table and your JWT has 'tenant_id'
-- alter table public.media_enrich_runs add column tenant_id uuid; -- if not present

create policy "tenant_members_can_read_runs"
on public.media_enrich_runs
forselect
to authenticated
using (tenant_id= (auth.jwt()->>'tenant_id')::uuid);
```

Indexes for smoother reads

**SQL Query**

```sql
create index ifnotexists idx_media_enrich_runs_started_aton public.media_enrich_runs(started_atdesc);
-- Add tenant_id index if you use tenant scoping
-- create index if not exists idx_media_enrich_runs_tenant on public.media_enrich_runs(tenant_id, started_at desc);
```

## **3) Integrate with the React component**

- Update the component to call your server route instead of the Edge Function directly if you want all backfills to be server-triggered with the service role.
- Keep the status polling via supabase.from('media_enrich_runs') for read-only visibility.

Example change in the component’s start handler

```tsx
// Replace invokeBackfill(...)with:
awaitfetch('/api/media-enricher/backfill', {
method:'POST',
  headers: {'Content-Type':'application/json' },
  body:JSON.stringify({
    bucket,
    prefix: prefix || undefined,
limit: typeoflimit ==='number' ?limit : undefined,
  }),
})
```

If you need an App Router version or want me to add an auth check to the API route, say the word and I’ll drop it in.

drop it

Reasoned

## **Next.js App Router route with auth + service role invocation**

Assumptions

- You’re using Next.js App Router (app/ directory).
- You use NextAuth or Supabase Auth Helpers for Next.js to gate admin access. Below are two variants:
    - Variant A: Supabase Auth Helpers (server-side) — minimal, checks session via cookies.
    - Variant B: NextAuth — uses getServerSession.

Pick one variant that matches your stack.

---

## **Variant A: Supabase Auth Helpers (recommended if you already use supabase-js)**

Install helpers if not already:

- npm i @supabase/auth-helpers-nextjs

Create app/api/media-enricher/backfill/route.ts

```tsx
import { NextResponse }from'next/server'
import { createRouteHandlerClient }from'@supabase/auth-helpers-nextjs'
import { cookies }from'next/headers'
exportasyncfunctionPOST(req: Request){
try {
const cookieStore = cookies()
const supabase = createRouteHandlerClient({cookies:() => cookieStore })
const {
data: { session },
error: sessionError,
    } =await supabase.auth.getSession()
if (sessionError) {
return NextResponse.json({error: sessionError.message }, {status:401 })
    }
if (!session) {
return NextResponse.json({error:'Unauthorized' }, {status:401 })
    }
// Optional: enforce admin role from JWT, e.g., 'user_role' claim
const role = session.user.user_metadata?.user_role || session.user.app_metadata?.user_role
if (role !=='admin') {
return NextResponse.json({error:'Forbidden' }, {status:403 })
    }
const body =await req.json().catch(() => ({}))
const bucket =String(body.bucket ??'dashboard-assets')
const prefix = body.prefix ?String(body.prefix) :undefined
const limit = body.limit ?String(body.limit) :undefined
const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!baseUrl || !serviceKey) {
return NextResponse.json(
        {error:'Missing env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' },
        {status:500 }
      )
    }
const fnUrl =new URL(`${baseUrl}/functions/v1/media-enricher/backfill`)
    fnUrl.searchParams.set('bucket', bucket)
if (prefix) fnUrl.searchParams.set('prefix', prefix)
if (limit) fnUrl.searchParams.set('limit', limit)
const r =await fetch(fnUrl.toString(), {
method:'POST',
headers: {
Authorization:`Bearer${serviceKey}`,
'Content-Type':'application/json',
      },
body:JSON.stringify({}),
// Optionally increase timeout on your hosting platform if needed
    })
const text =await r.text()
if (!r.ok) {
returnnew NextResponse(text, {status: r.status })
    }
try {
return NextResponse.json(JSON.parse(text))
    }catch {
returnnew NextResponse(text, {status:200 })
    }
  }catch (e:any) {
return NextResponse.json({error: e.message ??'Unknown error' }, {status:500 })
  }
}
```

Notes

- Admin gating: we check a user_role claim in the JWT. Adjust to your claim or use a DB lookup if needed.
- Never expose SUPABASE_SERVICE_ROLE_KEY to the browser; this lives only on the server.

---

## **Variant B: NextAuth (if you use next-auth)**

Assumes you’ve set up NextAuth and exported authOptions.

app/api/media-enricher/backfill/route.ts

```tsx
import { NextResponse }from'next/server'
import { getServerSession }from'next-auth'
import { authOptions }from'@/app/api/auth/[...nextauth]/authOptions'
export asyncfunction POST(req: Request) {
  try {
    constsession = await getServerSession(authOptions)
if (!session) {
return NextResponse.json({ error:'Unauthorized' }, { status:401 })
    }
    // Optional:checkforadminroleonsession.user
    constrole = (session.userasany)?.role
if (role !=='admin') {
return NextResponse.json({ error:'Forbidden' }, { status:403 })
    }
    const body = await req.json().catch(() => ({}))
    const bucket = String(body.bucket ??'dashboard-assets')
    const prefix = body.prefix ? String(body.prefix) : undefined
    constlimit = body.limit ? String(body.limit) : undefined
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!baseUrl || !serviceKey) {
return NextResponse.json(
        { error:'Missing env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' },
        { status:500 }
      )
    }
    const fnUrl =new URL(`${baseUrl}/functions/v1/media-enricher/backfill`)
    fnUrl.searchParams.set('bucket', bucket)
if (prefix) fnUrl.searchParams.set('prefix', prefix)
if (limit) fnUrl.searchParams.set('limit',limit)
    const r = awaitfetch(fnUrl.toString(), {
method:'POST',
      headers: {
Authorization: `Bearer ${serviceKey}`,
'Content-Type':'application/json',
      },
      body:JSON.stringify({}),
    })
    consttext = await r.text()
if (!r.ok) {
returnnew NextResponse(text, { status: r.status })
    }
    try {
return NextResponse.json(JSON.parse(text))
    } catch {
returnnew NextResponse(text, { status:200 })
    }
  } catch (e:any) {
return NextResponse.json({ error: e.message ??'Unknown error' }, { status:500 })
  }
}
```

---

## **Client usage with the App Router route**

From your React component, call the route:

```tsx
awaitfetch('/api/media-enricher/backfill', {
method:'POST',
  headers: {'Content-Type':'application/json' },
  body:JSON.stringify({
    bucket,
    prefix: prefix || undefined,
limit: typeoflimit ==='number' ?limit : undefined,
  }),
})
```

---

## **Hardening options**

- Add input validation (e.g., zod) to enforce bucket, prefix, and limit shapes.
- Rate-limit the route for non-admins.
- Log invocations to your DB for audit (e.g., insert into audit.enricher_invocations).
- If multi-tenant, pass tenant_id and validate against the caller’s claims before invoking the function.