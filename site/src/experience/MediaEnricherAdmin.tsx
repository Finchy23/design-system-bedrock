import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Surface from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';
import Input from '../primitives/Input';
import Icon from '../primitives/Icon';
import { createMediaEnricherClient, MediaEnricherClient } from '../lib/mediaEnricherApi';

export type MediaEnrichRun = {
  id: string;
  started_at?: string | null;
  status?: string | null;
  total_files?: number | null;
  processed_files?: number | null;
  succeeded?: number | null;
  failed?: number | null;
};

export type MediaEnricherAdminProps = {
  supabaseUrl?: string; // e.g., https://xyz.supabase.co
  getToken?: () => Promise<string>; // returns a JWT; defaults to undefined (no auth header)
  defaultBucket?: string;
  defaultPrefix?: string;
  defaultLimit?: number;
  pollIntervalMs?: number;
  invokeBackfill?: (bucket: string, prefix?: string, limit?: number) => Promise<void>;
  loadRuns?: () => Promise<MediaEnrichRun[]>;
  apiBaseUrl?: string; // master API base, defaults to /api
  getToken?: () => Promise<string | undefined>; // session token for master API
  canManage?: boolean; // RBAC flag; if false, component shows blocked state
};

async function invokeBackfillHttp(baseUrl: string, bucket: string, token?: string, prefix?: string, limit?: number) {
  const url = new URL(`${baseUrl.replace(/\/$/, '')}/functions/v1/media-enricher/backfill`);
  url.searchParams.set('bucket', bucket);
  if (prefix) url.searchParams.set('prefix', prefix);
  if (typeof limit === 'number') url.searchParams.set('limit', String(limit));

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: '{}'
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backfill failed: ${res.status} ${text}`);
  }
}

async function loadRunsHttp(baseUrl: string, token?: string): Promise<MediaEnrichRun[]> {
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/rest/v1/media_enrich_runs?select=id,started_at,status,total_files,processed_files,succeeded,failed&order=started_at.desc&limit=20`, {
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Load runs failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<MediaEnrichRun[]>;
}

export function MediaEnricherAdmin({
  supabaseUrl,
  defaultBucket = 'dashboard-assets',
  defaultPrefix = '',
  defaultLimit,
  pollIntervalMs = 5000,
  invokeBackfill,
  loadRuns,
  apiBaseUrl = '/api',
  getToken,
  canManage = true
}: MediaEnricherAdminProps) {
  const [bucket, setBucket] = useState(defaultBucket);
  const [prefix, setPrefix] = useState(defaultPrefix);
  const [limit, setLimit] = useState<string>(defaultLimit ? String(defaultLimit) : '');
  const [runs, setRuns] = useState<MediaEnrichRun[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const pollRef = useRef<number | null>(null);

  const fetchRuns = useCallback(async () => {
    if (loadRuns) return loadRuns();
    if (supabaseUrl) {
      const token = getToken ? await getToken() : undefined;
      return loadRunsHttp(supabaseUrl, token);
    }
    const client: MediaEnricherClient = createMediaEnricherClient({ baseUrl: apiBaseUrl, getToken });
    return client.listRuns();
  }, [apiBaseUrl, getToken, loadRuns, supabaseUrl]);

  const startBackfill = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const numericLimit = limit === '' ? undefined : Number(limit);
      if (Number.isNaN(numericLimit as number)) {
        throw new Error('Limit must be a number');
      }
      if (invokeBackfill) {
        await invokeBackfill(bucket, prefix || undefined, numericLimit);
      } else if (supabaseUrl) {
        const token = getToken ? await getToken() : undefined;
        await invokeBackfillHttp(supabaseUrl, bucket, token, prefix || undefined, numericLimit);
      } else {
        const client: MediaEnricherClient = createMediaEnricherClient({ baseUrl: apiBaseUrl, getToken });
        await client.startBackfill({ bucket, prefix: prefix || undefined, limit: numericLimit });
      }
      // Refresh shortly after kicking off
      setTimeout(async () => {
        try {
          const rows = await fetchRuns();
          setRuns(rows);
        } catch (e: any) {
          setError(e.message ?? 'Failed to refresh runs');
        }
      }, 800);
    } catch (e: any) {
      setError(e.message ?? 'Failed to start backfill');
    } finally {
      setLoading(false);
    }
  }, [bucket, fetchRuns, getToken, invokeBackfill, limit, prefix, supabaseUrl]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const rows = await fetchRuns();
        if (mounted) setRuns(rows);
      } catch (e: any) {
        if (mounted) setError(e.message ?? 'Failed to load runs');
      }
    };
    load();
    if (pollIntervalMs > 0) {
      pollRef.current = window.setInterval(load, pollIntervalMs);
    }
    return () => {
      mounted = false;
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [fetchRuns, pollIntervalMs]);

  const latest = useMemo(() => runs?.[0], [runs]);

  if (!canManage) {
    return (
      <Surface tone="raised" padding="var(--space-5)" style={{ width: '100%', maxWidth: 880, margin: '0 auto' }}>
        <Stack gap={2}>
          <Text variant="h3">Media Enricher</Text>
          <Text variant="body" tone="muted">You don’t have access to manage media enrichment. Please contact an administrator.</Text>
        </Stack>
      </Surface>
    );
  }

  return (
    <Surface tone="raised" padding="var(--space-5)" style={{ width: '100%', maxWidth: 880, margin: '0 auto' }}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="h3">Media Enricher</Text>
          <Text variant="meta" tone="muted">Admin-only backfill trigger and run status</Text>
        </Stack>

        <Stack gap={3} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <Stack gap={1}>
            <Text variant="eyebrow" tone="muted">Bucket</Text>
            <Input value={bucket} onChange={(e) => setBucket(e.target.value)} />
          </Stack>
          <Stack gap={1}>
            <Text variant="eyebrow" tone="muted">Prefix (optional)</Text>
            <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} />
          </Stack>
          <Stack gap={1}>
            <Text variant="eyebrow" tone="muted">Limit (optional)</Text>
            <Input value={limit} onChange={(e) => setLimit(e.target.value)} />
          </Stack>
          <Stack gap={1} align="end" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={startBackfill} disabled={loading}>
              {loading ? 'Starting…' : 'Start backfill'}
            </Button>
          </Stack>
        </Stack>

        {error && (
          <Surface tone="overlay" padding="var(--space-3)" style={{ borderColor: 'var(--color-danger)' }}>
            <Stack gap={1} inline align="center">
              <Icon name="alert-triangle" size={16} color="var(--color-danger)" />
              <Text variant="small" tone="danger">{error}</Text>
            </Stack>
          </Surface>
        )}

        <Stack gap={2}>
          <Text variant="h3">Most recent run</Text>
          {latest ? (
            <Surface tone="base" padding="var(--space-4)">
              <Stack gap={2}>
                <Text variant="small" tone="muted">ID: {latest.id}</Text>
                <Text variant="body">Status: {latest.status ?? '—'}</Text>
                <Text variant="body">Started: {latest.started_at ?? '—'}</Text>
                <Text variant="body">Progress: {latest.processed_files ?? 0} / {latest.total_files ?? 0}</Text>
                <Text variant="body">Succeeded: {latest.succeeded ?? 0} · Failed: {latest.failed ?? 0}</Text>
              </Stack>
            </Surface>
          ) : (
            <Text variant="body" tone="muted">No runs yet.</Text>
          )}
        </Stack>

        <Stack gap={2}>
          <Text variant="h3">Recent runs</Text>
          <Stack gap={2}>
            {runs.map((r) => (
              <Surface key={r.id} tone="base" padding="var(--space-3)">
                <Stack gap={1}>
                  <Text variant="small" tone="muted">{r.id}</Text>
                  <Text variant="body">Status: {r.status ?? '—'}</Text>
                  <Text variant="body">Started: {r.started_at ?? '—'}</Text>
                  <Text variant="body">Processed: {r.processed_files ?? 0} / {r.total_files ?? 0} · OK: {r.succeeded ?? 0} · Failed: {r.failed ?? 0}</Text>
                </Stack>
              </Surface>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Surface>
  );
}

export default MediaEnricherAdmin;
