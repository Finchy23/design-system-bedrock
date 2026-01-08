import React from 'react';
import Surface from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';
import Icon from '../primitives/Icon';
import ProofStrip from '../primitives/ProofStrip';
import WhyThis from '../primitives/WhyThis';
import { useEffect, useMemo, useState } from 'react';

type Heat = 'red' | 'amber' | 'green';
type Stance = 'clinician' | 'coach' | 'nurturer' | 'witness' | 'sage' | 'straight' | 'paradox' | 'elder';
type AudioFlavor = 'spark' | 'flame' | 'ember' | 'none';
type ReceiptState = 'pending' | 'captured' | 'failed';
type TransferState = 'pending' | 'captured' | 'failed';

export type LoopInstrumentProps = {
  mode?: 'companion' | 'clinician';
  heat: Heat;
  mttrSeconds: number;
  mttrDelta?: number; // negative is improvement
  mttrHistory?: number[]; // sparkline, most recent last
  transferStreak?: number; // consecutive transfers completed (return cadence)
  resistanceBadge?: { count: number; last?: string };
  isMobile?: boolean;
  proofBadge?: { completed: number; total: number };
  schema: string;
  family: string;
  mindblock: string;
  move: string;
  stance: Stance;
  receipts: Array<{ key: string; label: string; state: ReceiptState }>;
  transfer: { key: string; label: string; state: TransferState };
  safeStates?: Heat[];
  pillar?: string;
  concept?: string;
  theme?: string;
  audio?: AudioFlavor;
  resistance?: boolean;
  resistanceNotes?: string[];
  resistanceTimeline?: Array<{ ts: string; note: string }>; // recent resistance events
  whyLine?: string;
  onWhyThis?: () => void;
  onEscalate?: () => void;
  onReceiptClick?: (key: string) => void;
  onTransferClick?: (key: string) => void;
  onNextMove?: () => void;
  pinnedCTA?: boolean;
  compressProof?: boolean;
  companionProofChip?: string;
  proofSubtitle?: string;
};

const heatTone: Record<Heat, string> = {
  green: 'var(--color-state-calm)',
  amber: 'var(--color-state-heat)',
  red: 'var(--color-state-fracture)'
};

const stanceLabel: Record<Stance, string> = {
  clinician: 'Clinician',
  coach: 'Coach',
  nurturer: 'Nurturer',
  witness: 'Witness',
  sage: 'Sage',
  straight: 'Straight Talk',
  paradox: 'Paradox',
  elder: 'Elder'
};

const audioGlyph: Record<AudioFlavor, string> = {
  none: '',
  spark: 'activity',
  flame: 'flame',
  ember: 'moon'
};

const whyTone: Record<Heat, 'calm' | 'heat' | 'fracture'> = {
  green: 'calm',
  amber: 'heat',
  red: 'fracture'
};

const focusRing: React.CSSProperties = {
  outline: '2px solid var(--color-brand-primary)',
  outlineOffset: 1
};

function formatSeconds(secs: number) {
  if (secs < 90) return `${secs}s`;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return s ? `${m}m ${s}s` : `${m}m`;
}

function deltaLabel(delta?: number) {
  if (delta === undefined) return '';
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta}s`;
}

function Chip({ label, tone, filled = false, onClick }: { label: string; tone: 'muted' | 'primary' | 'brand' | 'danger'; filled?: boolean; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const transform = active ? 'translateY(1px)' : filled ? 'scale(1.02)' : 'translateY(0)';
  const [glow, setGlow] = useState(filled);
  const base: React.CSSProperties = {
    border: `1px solid ${tone === 'brand' ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
    background: filled
      ? (tone === 'brand' ? 'var(--color-brand-primary)' : 'var(--color-bg-surface)')
      : hover && onClick
        ? 'var(--color-bg-surface)'
        : 'transparent',
    color: filled
      ? 'var(--color-text-on-brand)'
      : tone === 'muted'
        ? 'var(--color-text-muted)'
        : tone === 'danger'
          ? 'var(--color-danger)'
          : 'var(--color-text-primary)',
    padding: '6px 10px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: onClick ? 'pointer' : 'default',
    fontSize: 'var(--type-size-small)',
    fontWeight: 'var(--type-weight-medium)',
    textTransform: 'none',
    transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease, transform 120ms ease, box-shadow 160ms ease',
    transform,
    boxShadow: glow && filled && tone === 'brand'
      ? '0 0 0 4px color-mix(in srgb, var(--color-brand-primary) 25%, transparent)'
      : undefined
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={base}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseOut={() => setActive(false)}
      onAnimationEnd={() => setGlow(false)}
      onFocus={(e) => {
        Object.assign(e.currentTarget.style, focusRing);
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
    >
      {label}
    </button>
  );
}

export function RecoveryLoopInstrument({
  mode = 'clinician',
  heat,
  mttrSeconds,
  mttrDelta,
  schema,
  family,
  mindblock,
  move,
  stance,
  receipts,
  transfer,
  safeStates,
  pillar,
  concept,
  theme,
  audio = 'none',
  resistance = false,
  resistanceNotes,
  resistanceTimeline,
  transferStreak,
  resistanceBadge,
  proofBadge,
  whyLine,
  onWhyThis,
  onEscalate,
  onReceiptClick,
  onTransferClick,
  onNextMove,
  isMobile = false,
  pinnedCTA = false,
  compressProof = false,
  companionProofChip,
  proofSubtitle
}: LoopInstrumentProps) {
  const heatColor = heatTone[heat];
  const ringProgress = useMemo(() => {
    const completed = receipts.filter(r => r.state === 'captured').length + (transfer.state === 'captured' ? 1 : 0);
    const total = receipts.length + 1;
    return Math.min(1, total === 0 ? 0 : completed / total);
  }, [receipts, transfer]);

  const [showRingDone, setShowRingDone] = useState(false);
  useEffect(() => {
    if (ringProgress === 1) {
      setShowRingDone(true);
      const t = setTimeout(() => setShowRingDone(false), 1400);
      return () => clearTimeout(t);
    }
    setShowRingDone(false);
    return undefined;
  }, [ringProgress]);

  const proofStage = useMemo(() => {
    const receiptsDone = receipts.every((r) => r.state === 'captured');
    if (transfer.state === 'captured') return 'trajectory';
    if (receiptsDone) return 'transfer';
    return 'receipt';
  }, [receipts, transfer]);

  const proofSubtitleText = useMemo(() => {
    if (proofSubtitle) return proofSubtitle;
    if (proofStage === 'trajectory') return 'Default forming.';
    if (proofStage === 'transfer') return 'Held outside the app.';
    return 'Proof starts with receipts.';
  }, [proofStage, proofSubtitle]);

  return (
    <Surface tone="overlay" padding={isMobile ? 'var(--space-4)' : 'var(--space-6)'} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient heat band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: heatColor, opacity: 0.9 }} />

      <Stack gap={isMobile ? 4 : 6} style={{ position: 'relative' }}>
        {/* Header: MTTR + heat */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          <Stack gap={1}>
            <Text variant="meta" tone="muted">Mean Time To Return</Text>
            <Text variant={isMobile ? 'h2' : 'h1'}>{formatSeconds(mttrSeconds)}</Text>
            {mode === 'clinician' && mttrHistory && mttrHistory.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 24 }}>
                {(() => {
                  const max = Math.max(...mttrHistory);
                  return mttrHistory.map((val, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: 6,
                        height: max === 0 ? 2 : Math.max(2, (val / max) * 24),
                        background: val === mttrHistory[mttrHistory.length - 1] ? 'var(--color-brand-primary)' : 'var(--color-border-default)'
                      }}
                    />
                  ));
                })()}
              </div>
            )}
          </Stack>
          <Stack gap={2} inline align="center" style={{ flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
            {mttrDelta !== undefined && (
              <Text variant="meta" tone={mttrDelta <= 0 ? 'muted' : 'danger'}>{deltaLabel(mttrDelta)}</Text>
            )}
            {audio !== 'none' && <Icon name={audioGlyph[audio]} size={18} color={heatColor} />}
            <Text variant="meta" tone="muted" style={{ letterSpacing: '0.04em' }}>{heat.toUpperCase()}</Text>
            {mode === 'clinician' && typeof transferStreak === 'number' && (
              <Stack gap={1} inline align="center">
                <Icon name="trending-up" size={16} color="var(--color-text-primary)" />
                <Text variant="meta" tone="muted">Return cadence {transferStreak}</Text>
              </Stack>
            )}
            {mode === 'clinician' && resistanceBadge && (
              <Stack gap={1} inline align="center">
                <Icon name="alert-triangle" size={16} color="var(--color-text-primary)" />
                <Text variant="meta" tone="muted">{resistanceBadge.count} resisted{resistanceBadge.last ? ` · ${resistanceBadge.last}` : ''}</Text>
              </Stack>
            )}
            {mode === 'clinician' && proofBadge && (
              <Stack gap={1} inline align="center">
                <Icon name="check-circle" size={16} color="var(--color-text-primary)" />
                <Text variant="meta" tone="muted">{proofBadge.completed}/{proofBadge.total} proof</Text>
              </Stack>
            )}
          </Stack>
        </div>

        {/* Target stack */}
        <Stack gap={2}>
          <Text variant="eyebrow" tone="muted">Target</Text>
          <Stack gap={2} inline align="center" style={{ flexWrap: 'wrap' }}>
            <Chip label={schema} tone="muted" />
            <Chip label={family} tone="muted" />
            <Chip label={mindblock} tone="primary" />
          </Stack>
        </Stack>

        {/* Move + stance */}
        <Stack gap={2}>
          <Text variant="eyebrow" tone="muted">Move & Stance</Text>
          <Stack gap={3} inline align="center" style={{ flexWrap: 'wrap' }}>
            <Chip label={move} tone="primary" filled />
            <Chip label={stanceLabel[stance]} tone="muted" />
            {safeStates && safeStates.length > 0 && <Chip label={`Safe: ${safeStates.join('/')}`} tone="muted" />}
          </Stack>
        </Stack>

        {/* Proof lane */}
        <Stack gap={2}>
          <Stack gap={1}>
            <Text variant="eyebrow" tone="muted">Proof & Transfer</Text>
            <ProofStrip stage={proofStage} subtitle={proofSubtitleText} />
          </Stack>
          {compressProof ? (
            <Stack gap={2}>
              <Stack gap={1} inline align="center" style={{ flexWrap: 'wrap' }}>
                {receipts.map((r) => (
                  <Chip
                    key={r.key}
                    label={r.label}
                    tone={r.state === 'failed' ? 'danger' : r.state === 'captured' ? 'brand' : 'muted'}
                    filled={r.state === 'captured'}
                    onClick={onReceiptClick ? () => onReceiptClick(r.key) : undefined}
                  />
                ))}
              </Stack>
              <Stack gap={1} inline align="center">
                <Chip
                  label={transfer.label}
                  tone={transfer.state === 'failed' ? 'danger' : transfer.state === 'captured' ? 'brand' : 'muted'}
                  filled={transfer.state === 'captured'}
                  onClick={onTransferClick ? () => onTransferClick(transfer.key) : undefined}
                />
              </Stack>
            </Stack>
          ) : (
            <Stack gap={2} inline align="center" style={{ flexWrap: 'wrap' }}>
              {receipts.map((r) => (
                <Chip
                  key={r.key}
                  label={r.label}
                  tone={r.state === 'failed' ? 'danger' : r.state === 'captured' ? 'brand' : 'muted'}
                  filled={r.state === 'captured'}
                  onClick={onReceiptClick ? () => onReceiptClick(r.key) : undefined}
                />
              ))}
              <Chip
                label={transfer.label}
                tone={transfer.state === 'failed' ? 'danger' : transfer.state === 'captured' ? 'brand' : 'muted'}
                filled={transfer.state === 'captured'}
                onClick={onTransferClick ? () => onTransferClick(transfer.key) : undefined}
              />
            </Stack>
          )}
        </Stack>

        {/* Trust strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          {mode === 'clinician' ? (
            <Stack gap={1}>
              <Text variant="eyebrow" tone="muted">Lineage</Text>
              <Text variant="small" tone="muted">
                {[pillar, concept, theme].filter(Boolean).join(' · ')}
              </Text>
              {whyLine && <WhyThis reason={whyLine} tone={whyTone[heat]} />}
              <Button variant="tertiary" onClick={onWhyThis}>Why this</Button>
            </Stack>
          ) : (
            <Stack gap={1}>
              <Text variant="eyebrow" tone="muted">Next Move</Text>
              {whyLine && <WhyThis reason={whyLine} tone={whyTone[heat]} />}
              {!pinnedCTA && <Button variant="primary" onClick={onNextMove}>Do this now</Button>}
              {companionProofChip && <Chip label={companionProofChip} tone="muted" />}
            </Stack>
          )}
          <Stack gap={2} inline align="center">
            <Text variant="meta" tone="muted">Governed</Text>
            <Icon name="shield" size={16} color="var(--color-text-primary)" />
            <Button variant={resistance ? 'primary' : 'secondary'} disabled={!resistance} onClick={onEscalate}>
              {resistance ? 'Escalate' : 'Stable'}
            </Button>
          </Stack>
        </div>

        {mode === 'clinician' && resistanceNotes && resistanceNotes.length > 0 && (
          <Stack gap={1}>
            <Text variant="eyebrow" tone="muted">Resistance</Text>
            <Stack gap={1}>
              {resistanceNotes.map((note, idx) => (
                <Text key={idx} variant="small" tone="muted">• {note}</Text>
              ))}
            </Stack>
          </Stack>
        )}

        {mode === 'clinician' && resistanceTimeline && resistanceTimeline.length > 0 && (
          <Stack gap={1}>
            <Text variant="eyebrow" tone="muted">Recent resistance</Text>
            <Stack gap={1}>
              {resistanceTimeline.slice(0, 3).map((item, idx) => (
                <Stack key={idx} gap={1} inline align="center">
                  <Icon name="clock" size={14} color="var(--color-text-muted)" />
                  <Text variant="small" tone="muted">{item.ts} · {item.note}</Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>

      {/* Loop ring (decorative, no SVG deps) */}
      <div style={{ position: 'absolute', top: 'var(--space-6)', right: 'var(--space-6)', bottom: 'var(--space-6)', width: 6, background: 'var(--color-border-default)' }}>
        <div
          style={{
            height: `${ringProgress * 100}%`,
            background: resistance ? heatTone.red : 'var(--color-brand-primary)',
            transition: 'height 240ms ease, box-shadow 320ms ease-out',
            boxShadow: ringProgress === 1
              ? `0 0 0 4px color-mix(in srgb, ${resistance ? 'var(--color-state-fracture)' : 'var(--color-brand-primary)'} 25%, transparent)`
              : undefined
          }}
          onAnimationEnd={(e) => {
            // strip glow after transition completes
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          }}
        />
        {showRingDone && (
          <div style={{ position: 'absolute', right: -4, top: 0, width: 2, height: '100%', background: 'var(--color-brand-primary)', opacity: 0.3 }} />
        )}
        {showRingDone && (
          <div style={{ position: 'absolute', top: -10, right: -6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="check" size={14} color={resistance ? heatTone.red : 'var(--color-brand-primary)'} />
            <Text variant="meta" tone="muted">Done</Text>
          </div>
        )}
      </div>

      {mode === 'companion' && pinnedCTA && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'var(--space-4)', background: 'linear-gradient(180deg, rgba(247,247,248,0) 0%, rgba(247,247,248,1) 60%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          {whyLine && <Text variant="small" tone="muted">{whyLine}</Text>}
          <Button variant="primary" onClick={onNextMove}>Do this now</Button>
        </div>
      )}
    </Surface>
  );
}

export default RecoveryLoopInstrument;