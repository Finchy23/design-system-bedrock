import React, { useMemo, useState } from "react";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import Surface from "../primitives/Surface";
import Button from "../primitives/Button";
import Divider from "../primitives/Divider";
import Icon from "../primitives/Icon";
import {
  Activity,
  Anchor,
  ArrowRight,
  BadgeCheck,
  Brain,
  Compass,
  FileLock,
  Flame,
  Gauge,
  Layers,
  Map,
  Radio,
  Repeat,
  Sparkles,
  Target,
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

const shell: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(87,57,251,0.06), rgba(64,224,208,0.06))",
  boxShadow: "0 16px 48px rgba(6,12,31,0.12)",
  border: "1px solid var(--color-border-default)",
  borderRadius: "var(--radius)",
  position: "relative",
  overflow: "hidden"
};

const lift = (active: boolean): React.CSSProperties => ({
  transform: active ? "translateY(-4px)" : "translateY(0)",
  boxShadow: active ? "0 18px 50px rgba(6,12,31,0.18)" : "0 10px 28px rgba(6,12,31,0.12)",
  transition: "transform var(--motion-fast) ease, box-shadow var(--motion-fast) ease"
});

export function ContinuityEnginePanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const signals = useMemo(
    () => [
      { title: "Operating truth", body: "RecoveryOS holds the spine; CI keeps it honest.", icon: FileLock },
      { title: "Orchestrator", body: "LUMA routes timing, dose, and room; keeps it coherent.", icon: Compass },
      { title: "Feed with a spine", body: "Always relevant, governed, clinical. Not random.", icon: Layers },
      { title: "System meets you", body: "Right room, right time, right dose. No maze walking.", icon: Map }
    ],
    []
  );

  return (
    <Surface tone="overlay" glass padding="var(--space-6)" style={shell}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">Continuity Engine</Text>
          <Text variant="h1">The product meets the science.</Text>
          <Text tone="muted">One governed spine that keeps the rooms coherent, delivers at the right dose, and makes the experience feel like your house.</Text>
        </Stack>
        <Stack inline gap={2} style={{ flexWrap: "wrap" }}>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={Anchor} size="sm" tone="brand" /><Text variant="small">One surface rule</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={Sparkles} size="sm" tone="brand" /><Text variant="small">Feed with a spine</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={BadgeCheck} size="sm" tone="brand" /><Text variant="small">Governed conductor</Text></Surface>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {signals.map((item) => (
            <Surface
              key={item.title}
              tone="base"
              padding="var(--space-4)"
              style={{ minWidth: 240, ...lift(hovered === item.title), cursor: "default" }}
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
      </Stack>
    </Surface>
  );
}

export function LumaPanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const vows = useMemo(
    () => [
      { title: "State-read", body: "Heat · readiness · resistance · timing; still consent-bound.", icon: Radio },
      { title: "Route", body: "Select primitive (Journey / NaviCue) with target + dose + heat band.", icon: Compass },
      { title: "Deliver", body: "Rooms come to you. Right room, right time, right dose.", icon: Map },
      { title: "Seal", body: "Proof request + receipt ID + mindblock ID + provenance.", icon: BadgeCheck }
    ],
    []
  );

  return (
    <Surface tone="base" padding="var(--space-6)" style={{ border: "1px solid var(--color-border-default)" }}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">LUMA</Text>
          <Text variant="h1">Trusted orchestration.</Text>
          <Text tone="muted">Reads the moment, routes the right move, enforces appropriateness, and pairs every action with a receipt.</Text>
        </Stack>
        <Stack inline gap={2} style={{ flexWrap: "wrap" }}>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={Brain} size="sm" tone="brand" /><Text variant="small">Decision OS</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={Gauge} size="sm" tone="brand" /><Text variant="small">Heat-aware</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={FileLock} size="sm" tone="brand" /><Text variant="small">Governed</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={Zap} size="sm" tone="brand" /><Text variant="small">JITAI delivery</Text></Surface>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {vows.map((item) => (
            <Surface
              key={item.title}
              tone="raised"
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
        <Divider />
        <Stack inline gap={2} align="center">
          <Icon icon={ArrowRight} tone="brand" />
          <Text tone="muted">Apple-like universal player: one cue system across Journeys and NaviCues; governed, coherent, right-sized.</Text>
        </Stack>
      </Stack>
    </Surface>
  );
}

export function JourneyPanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const eras = useMemo(
    () => [
      { title: "Experience", body: "Body-first, state-first, felt shift that installs safety.", icon: Flame },
      { title: "Recognise", body: "Name the loop as it happens; meta-awareness on-tap.", icon: Radio },
      { title: "Align", body: "One real-world move. Small enough to repeat. Clear enough to prove.", icon: Target }
    ],
    []
  );

  const artifacts = useMemo(
    () => [
      "Baseline builds", "Guided exposures", "Pattern maps", "Identity installs", "Alignment reps", "Weekly receipts"
    ],
    []
  );

  return (
    <Surface tone="overlay" glass padding="var(--space-6)" style={shell}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">Journeys</Text>
          <Text variant="h1">Install baseline, weekly.</Text>
          <Text tone="muted">Not a curriculum — a cadence the brain can trust. Weekly installation cycles that turn proof into identity.</Text>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {eras.map((item) => (
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
                  <Text variant="meta" tone="muted">ERA loop</Text>
                </Stack>
                <Text variant="h3">{item.title}</Text>
                <Text tone="muted">{item.body}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
        <Surface tone="base" padding="var(--space-4)" style={{ border: "1px dashed var(--color-border-default)" }}>
          <Stack gap={1}>
            <Text variant="eyebrow" tone="brand">Artifacts</Text>
            <Stack inline gap={2} style={{ flexWrap: "wrap" }}>
              {artifacts.map((item) => (
                <Surface key={item} padding="var(--space-2)" style={pill}><Icon icon={Repeat} size="sm" tone="brand" /><Text variant="small">{item}</Text></Surface>
              ))}
            </Stack>
            <Text tone="muted">Receipts land weekly: reflections, scene captures, alignment moves. Not paperwork — artifacts.</Text>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

export function NaviCuesPanel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const moves = useMemo(
    () => [
      { title: "One move. One contract.", body: "Target · mechanism · primary primitive · heat band · intent · proof request.", icon: Target },
      { title: "Surprise in safe rails", body: "Novelty earns attention; rails prevent drift.", icon: Sparkles },
      { title: "Clinical clarity", body: "Neuroplastic atoms — small enough to run under heat; real enough to rewire.", icon: Activity },
      { title: "Symbiotic with journeys", body: "Journeys install baseline; NaviCues steer the moment and test it in the wild.", icon: Map }
    ],
    []
  );

  const catalogue = useMemo(
    () => [
      "Cognition sparks", "Pattern bridges", "Story seeds", "Somatic scans", "Value threads", "Proof stamps", "Belief probes", "Witness windows", "Paradox keys", "Practice shards"
    ],
    []
  );

  return (
    <Surface tone="base" padding="var(--space-6)" style={{ border: "1px solid var(--color-border-default)" }}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">NaviCues</Text>
          <Text variant="h1">Steer the moment.</Text>
          <Text tone="muted">Moment-level micro-interventions. Adaptive, governed JITAI delivery that turns the moment into a move.</Text>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {moves.map((item) => (
            <Surface
              key={item.title}
              tone="raised"
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
        <Surface tone="base" padding="var(--space-4)" style={{ border: "1px dashed var(--color-border-default)" }}>
          <Stack gap={1}>
            <Text variant="eyebrow" tone="brand">Micro-intervention kit</Text>
            <Stack inline gap={2} style={{ flexWrap: "wrap" }}>
              {catalogue.map((item) => (
                <Surface key={item} padding="var(--space-2)" style={pill}><Icon icon={Flame} size="sm" tone="brand" /><Text variant="small">{item}</Text></Surface>
              ))}
            </Stack>
            <Text tone="muted">Novelty inside safe rails. Each cue ships with proof request, target, and heat-band suitability.</Text>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

export function RecoveryContinuityShowcase() {
  return (
    <Stack gap={5}>
      <ContinuityEnginePanel />
      <LumaPanel />
      <JourneyPanel />
      <NaviCuesPanel />
      <Surface tone="base" padding="var(--space-5)" style={{ border: "1px solid var(--color-border-default)" }}>
        <Stack inline justify="space-between" align="center">
          <Stack gap={1}>
            <Text variant="eyebrow" tone="brand">Continuity spine</Text>
            <Text tone="muted">Rooms become callable atoms; LUMA brings them on-time; receipts stay transferable.</Text>
          </Stack>
          <Stack inline gap={2}>
            <Button variant="primary"><Stack inline align="center" gap={1}><Text style={{ color: "var(--color-text-on-brand)" }}>Start a Journey</Text><Icon icon={ArrowRight} tone="white" /></Stack></Button>
            <Button variant="secondary">Play a NaviCue</Button>
          </Stack>
        </Stack>
      </Surface>
    </Stack>
  );
}

export default RecoveryContinuityShowcase;
