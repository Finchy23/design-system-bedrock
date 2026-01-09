import React, { useMemo, useState } from "react";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import Surface from "../primitives/Surface";
import Button from "../primitives/Button";
import Divider from "../primitives/Divider";
import Icon from "../primitives/Icon";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Compass,
  DoorOpen,
  FileLock,
  HeartPulse,
  Layers,
  Map,
  MonitorSmartphone,
  Radio,
  Receipt,
  Repeat,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

const pill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 10px",
  borderRadius: "999px",
  border: "1px solid var(--color-border-default)",
  background: "var(--color-bg-muted)",
  whiteSpace: "nowrap"
};

const lift = (active: boolean): React.CSSProperties => ({
  transform: active ? "translateY(-4px)" : "translateY(0)",
  boxShadow: active ? "0 18px 50px rgba(6,12,31,0.18)" : "0 10px 28px rgba(6,12,31,0.12)",
  transition: "transform var(--motion-fast) ease, box-shadow var(--motion-fast) ease"
});

const shell: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(87,57,251,0.05), rgba(64,224,208,0.05))",
  border: "1px solid var(--color-border-default)",
  borderRadius: "var(--radius)",
  boxShadow: "0 16px 48px rgba(6,12,31,0.12)",
  position: "relative",
  overflow: "hidden"
};

export function RecoveryLoopPanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const loop = useMemo(
    () => [
      { title: "Sense", body: "State-first, heat-aware, consent-bound. Read the moment, not the story.", icon: Radio },
      { title: "Route", body: "Right primitive, dose, and timing. Appropriateness gate in-line.", icon: Compass },
      { title: "Deliver", body: "Place the move inside real life. Catch the window.", icon: Map },
      { title: "Seal", body: "Proof request fires; pre/post captured; receipt logged with IDs.", icon: BadgeCheck }
    ],
    []
  );

  return (
    <Surface tone="overlay" glass padding="var(--space-6)" style={shell}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">Operating Loop</Text>
          <Text variant="h1">Sense → Route → Deliver → Seal</Text>
          <Text tone="muted">The quiet loop that makes change stick and keeps it auditable.</Text>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {loop.map((item) => (
            <Surface
              key={item.title}
              tone="base"
              padding="var(--space-4)"
              style={{ minWidth: 220, ...lift(hovered === item.title), cursor: "default" }}
              onMouseEnter={() => setHovered(item.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Stack inline align="center" gap={2}>
                  <Icon icon={item.icon} tone="brand" />
                  <Text variant="meta" tone="muted">{item.title}</Text>
                </Stack>
                <Text variant="h3">{item.title}</Text>
                <Text tone="muted">{item.body}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
        <Surface tone="base" padding="var(--space-3)" style={{ border: "1px dashed var(--color-border-default)" }}>
          <Stack gap={1}>
            <Text variant="eyebrow" tone="brand">Apple bar • in-product feel</Text>
            <Text tone="muted">State check → NaviCue surfaces → Move with heat band → Proof request (pre/post) → Receipt logs → Clinician sees state/aim/dose/target + hold-under-pressure note.</Text>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

export function RoomsPlayerPanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const rooms = useMemo(
    () => [
      { title: "Clinic", body: "Structured, clinician-guided delivery. Receipts flow back with provenance.", icon: ShieldCheck },
      { title: "Self", body: "Autonomous use with LUMA guardrails; the system meets you where you are.", icon: Sparkles },
      { title: "Relational", body: "Shared context across caregivers/peers; continuity without re-explaining.", icon: HeartPulse }
    ],
    []
  );

  return (
    <Surface tone="base" padding="var(--space-6)" style={{ border: "1px solid var(--color-border-default)" }}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">Rooms + Player</Text>
          <Text variant="h1">System meets you; one universal player.</Text>
          <Text tone="muted">LUMA brings the right room at the right dose. Journeys and NaviCues run on one cue system and player.</Text>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {rooms.map((room) => (
            <Surface
              key={room.title}
              tone="raised"
              padding="var(--space-4)"
              style={{ minWidth: 220, ...lift(hovered === room.title), cursor: "default" }}
              onMouseEnter={() => setHovered(room.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Stack inline align="center" gap={2}>
                  <Icon icon={room.icon} tone="brand" />
                  <Text variant="meta" tone="muted">{room.title}</Text>
                </Stack>
                <Text variant="h3">{room.title}</Text>
                <Text tone="muted">{room.body}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
        <Divider />
        <Stack inline gap={2} align="center" style={{ flexWrap: "wrap" }}>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={DoorOpen} size="sm" tone="brand" /><Text variant="small">Any room, on-time</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={MonitorSmartphone} size="sm" tone="brand" /><Text variant="small">Universal player</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={FileLock} size="sm" tone="brand" /><Text variant="small">Governed routing</Text></Surface>
        </Stack>
      </Stack>
    </Surface>
  );
}

export function SignalReceiptPanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const fields = useMemo(
    () => [
      "Receipt ID · Mindblock ID · Journey ID",
      "State · Aim · Dose · Target · Heat band",
      "Held-under-pressure note",
      "Pre · Post",
      "Timestamp · Location/room · Agent",
      "Provenance: consent mode · cadence rule · escalation rule",
      "Outcome: held · degraded · failed"
    ],
    []
  );

  return (
    <Surface tone="overlay" glass padding="var(--space-6)" style={shell}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">Signal / Receipt</Text>
          <Text variant="h1">Proof that travels.</Text>
          <Text tone="muted">Every move pairs to a receipt the nervous system and clinician trust. Transferable across rooms.</Text>
        </Stack>
        <Surface tone="base" padding="var(--space-4)" style={{ border: "1px dashed var(--color-border-default)" }}>
          <Stack gap={1}>
            <Stack inline align="center" gap={2}>
              <Icon icon={Receipt} tone="brand" />
              <Text variant="meta" tone="muted">Receipt spec</Text>
            </Stack>
            <Stack gap={1}>
              {fields.map((f) => (
                <Text key={f} tone="muted">{f}</Text>
              ))}
            </Stack>
          </Stack>
        </Surface>
        <Stack inline gap={2} style={{ flexWrap: "wrap" }}>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={BadgeCheck} size="sm" tone="brand" /><Text variant="small">Proof-first</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={Repeat} size="sm" tone="brand" /><Text variant="small">Transfer-ready</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={FileLock} size="sm" tone="brand" /><Text variant="small">Auditable</Text></Surface>
        </Stack>
      </Stack>
    </Surface>
  );
}

export function GovernancePanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const guards = useMemo(
    () => [
      { title: "One Surface Rule", body: "One elevated surface; interface defers to content. Prevents drift and noise.", icon: Layers },
      { title: "Token Rule", body: "All color/type/space/motion come from tokens; CI locks the spine.", icon: FileLock },
      { title: "Consent + Appropriateness", body: "Human boundary before speed; cadence rules; escalation ready.", icon: ShieldCheck },
      { title: "Safety-first", body: "Heat-aware delivery; novelty only inside safe rails.", icon: HeartPulse }
    ],
    []
  );

  return (
    <Surface tone="base" padding="var(--space-6)" style={{ border: "1px solid var(--color-border-default)" }}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">Governance</Text>
          <Text variant="h1">Safety, coherence, and CI locks.</Text>
          <Text tone="muted">Guardrails that keep the OS quiet, safe, and transferable.</Text>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {guards.map((guard) => (
            <Surface
              key={guard.title}
              tone="raised"
              padding="var(--space-4)"
              style={{ minWidth: 220, ...lift(hovered === guard.title), cursor: "default" }}
              onMouseEnter={() => setHovered(guard.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Stack inline align="center" gap={2}>
                  <Icon icon={guard.icon} tone="brand" />
                  <Text variant="meta" tone="muted">{guard.title}</Text>
                </Stack>
                <Text variant="h3">{guard.title}</Text>
                <Text tone="muted">{guard.body}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
      </Stack>
    </Surface>
  );
}

export function ProofTransferPanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const claims = useMemo(
    () => [
      { title: "Route actions, not ideas", body: "One prediction. One heat band. One primitive. Lived change over inspiration.", icon: ArrowRight },
      { title: "Micro-proof without performance", body: "Did it hold by 1%? Receipts stack quietly; identity updates.", icon: BadgeCheck },
      { title: "Transfer across rooms", body: "Same mindblock and receipt travel to Clinic, Self, Relational contexts.", icon: Repeat },
      { title: "Identity-level shift", body: "Proof consolidates new pathways into ‘I do this now.’", icon: Sparkles }
    ],
    []
  );

  return (
    <Surface tone="overlay" glass padding="var(--space-6)" style={shell}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">The Unlock</Text>
          <Text variant="h1">Proof that becomes identity.</Text>
          <Text tone="muted">Why the foundation works: small, provable moves that transfer and compound.</Text>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {claims.map((claim) => (
            <Surface
              key={claim.title}
              tone="base"
              padding="var(--space-4)"
              style={{ minWidth: 220, ...lift(hovered === claim.title), cursor: "default" }}
              onMouseEnter={() => setHovered(claim.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Stack inline align="center" gap={2}>
                  <Icon icon={claim.icon} tone="brand" />
                  <Text variant="meta" tone="muted">{claim.title}</Text>
                </Stack>
                <Text variant="h3">{claim.title}</Text>
                <Text tone="muted">{claim.body}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
        <Surface tone="base" padding="var(--space-3)" style={{ border: "1px dashed var(--color-border-default)" }}>
          <Stack inline align="center" gap={2}>
            <Icon icon={Zap} tone="brand" />
            <Text tone="muted">Receipts stack. Identity updates. Transfer makes it defensible.</Text>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

export function CriticalRecoveryDeck() {
  return (
    <Stack gap={5}>
      <RecoveryLoopPanel />
      <RoomsPlayerPanel />
      <SignalReceiptPanel />
      <GovernancePanel />
      <ProofTransferPanel />
      <Surface tone="base" padding="var(--space-5)" style={{ border: "1px solid var(--color-border-default)" }}>
        <Stack inline justify="space-between" align="center">
          <Stack gap={1}>
            <Text variant="eyebrow" tone="brand">Critical spine</Text>
            <Text tone="muted">Loop → Rooms → Receipts → Governance → Proof. Ready for LUMA routing and audits.</Text>
          </Stack>
          <Stack inline gap={2}>
            <Button variant="primary"><Stack inline align="center" gap={1}><Text style={{ color: "var(--color-text-on-brand)" }}>Run the loop</Text><Icon icon={ArrowRight} tone="white" /></Stack></Button>
            <Button variant="secondary">Open receipts spec</Button>
          </Stack>
        </Stack>
      </Surface>
    </Stack>
  );
}

export default CriticalRecoveryDeck;
