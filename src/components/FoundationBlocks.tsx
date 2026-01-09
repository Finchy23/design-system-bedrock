import React, { useMemo, useState } from "react";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import Surface from "../primitives/Surface";
import Divider from "../primitives/Divider";
import Button from "../primitives/Button";
import Icon from "../primitives/Icon";
import {
  Activity,
  Anchor,
  ArrowRight,
  BadgeCheck,
  Brain,
  Compass,
  Flame,
  Layers,
  Map,
  ShieldCheck,
  Sparkles,
  Target
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

export function OneEnginePanel() {
  const [hovered, setHovered] = useState<string | null>(null);

  const stages = useMemo(
    () => [
      { title: "Target", body: "Clinical spine: Pillars → Concepts → Themes → Schemas → Mindblocks.", icon: Target },
      { title: "Build", body: "Component engine: Modalities · Interactions · Somatic embodiment · Relational repair · Contemplation · Mechanics.", icon: Layers },
      { title: "Seal", body: "Proof receipt: K = Knowing · B = Believing · E = Embodying. Receipts that stack and transfer.", icon: BadgeCheck }
    ],
    []
  );

  return (
    <Surface tone="overlay" glass padding="var(--space-6)" style={shell}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">The Foundation</Text>
          <Text variant="h1">One Engine</Text>
          <Text tone="muted">Target → Build → Seal. Recovery broken into runnable units without breaking the soul.</Text>
        </Stack>
        <Stack inline gap={2} style={{ flexWrap: "wrap" }}>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={Anchor} size="sm" tone="brand" /><Text variant="small">One surface rule</Text></Surface>
          <Surface padding="var(--space-2)" style={pill}><Icon icon={ShieldCheck} size="sm" tone="brand" /><Text variant="small">Precision without drift</Text></Surface>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {stages.map((stage) => (
            <Surface
              key={stage.title}
              tone="base"
              padding="var(--space-4)"
              style={{ minWidth: 220, ...lift(hovered === stage.title), cursor: "default" }}
              onMouseEnter={() => setHovered(stage.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Stack inline align="center" gap={2}>
                  <Icon icon={stage.icon} tone="brand" />
                  <Text variant="meta" tone="muted">{stage.title}</Text>
                </Stack>
                <Text variant="h3">{stage.title}</Text>
                <Text tone="muted">{stage.body}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
      </Stack>
    </Surface>
  );
}

export function FrameworkPanel() {
  const [hovered, setHovered] = useState<string | null>(null);

  const layers = useMemo(
    () => [
      { title: "Pillars", body: "Emotional Regulation · Stress Resilience · Social Connectivity · Cognitive Reframing · Identity Integration · Decision Mastery", icon: Layers },
      { title: "Concepts", body: "Arousal regulation · Interoception · Attention/orienting · Inhibitory control · Reward/time horizon · Meaning/values · Co-regulation · Boundary mechanics · Narrative integration · Repair.", icon: Brain },
      { title: "Themes", body: "Downshift under load · Name the pattern · Create choice space · Urge surf · Reframe in motion · Values anchor · Boundary micro-reps · Repair the moment · Proof capture · Transfer testing.", icon: Activity },
      { title: "Schemas", body: "Recognition (K) · Belief Work (B) · Release (B/E) · Repair (E).", icon: Map },
      { title: "Modalities", body: "IFS · ACT · DBT · CBT · Somatic Experiencing · Motivational Interviewing · EFT.", icon: Compass },
      { title: "Interactions", body: "Glance · Seed · Thread · Journey + depth toggles; built for state alignment.", icon: Sparkles },
      { title: "Somatics", body: "Breath · body scanning · grounding · discharge · nervous system state.", icon: Flame },
      { title: "Relational repairs", body: "Rupture → repair · boundaries · amends · trust micro-tests · clean apology.", icon: ShieldCheck },
      { title: "Contemplations", body: "Values recall · inquiry prompts · perspective shifts · paradox frames · narrative re-authoring.", icon: Sparkles },
      { title: "Proof", body: "Micro-wins · pre/post · vault · review · timeline. Transferable receipts.", icon: BadgeCheck },
      { title: "Mechanics", body: "Future-self · simulation · pattern interrupts · narrative edits.", icon: Target },
      { title: "Mindblocks", body: "When X, I predict Y — so I do Z. Smallest prediction we rewrite and prove.", icon: ArrowRight }
    ],
    []
  );

  return (
    <Surface tone="base" padding="var(--space-6)" style={{ border: "1px solid var(--color-border-default)" }}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">The Foundation</Text>
          <Text variant="h1">Framework</Text>
          <Text tone="muted">Stable architecture that keeps the science real, the skills trainable, and the proof transferable.</Text>
        </Stack>
        <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
          {layers.map((layer) => (
            <Surface
              key={layer.title}
              tone="raised"
              padding="var(--space-4)"
              style={{ minWidth: 240, ...lift(hovered === layer.title), cursor: "default" }}
              onMouseEnter={() => setHovered(layer.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Stack inline align="center" gap={2}>
                  <Icon icon={layer.icon} tone="brand" />
                  <Text variant="meta" tone="muted">{layer.title}</Text>
                </Stack>
                <Text variant="h3">{layer.title}</Text>
                <Text tone="muted">{layer.body}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
      </Stack>
    </Surface>
  );
}

export function UnlockPanel() {
  return (
    <Surface tone="overlay" glass padding="var(--space-5)" style={shell}>
      <Stack gap={3}>
        <Stack gap={1}>
          <Text variant="eyebrow" tone="brand">The Unlock</Text>
          <Text variant="h2">Why this foundation works</Text>
        </Stack>
        <Stack gap={2}>
          <Surface tone="base" padding="var(--space-3)" style={{ border: "1px dashed var(--color-border-default)" }}>
            <Stack gap={1}>
              <Text variant="h3">Route the right move</Text>
              <Text tone="muted">One prediction. One heat band. One primitive. We route actions, not ideas.</Text>
            </Stack>
          </Surface>
          <Surface tone="base" padding="var(--space-3)" style={{ border: "1px dashed var(--color-border-default)" }}>
            <Stack gap={1}>
              <Text variant="h3">Measure without performance</Text>
              <Text tone="muted">Proof requests stay small. Receipts stack quietly; identity updates over time.</Text>
            </Stack>
          </Surface>
          <Surface tone="base" padding="var(--space-3)" style={{ border: "1px dashed var(--color-border-default)" }}>
            <Stack gap={1}>
              <Text variant="h3">Transfer across rooms</Text>
              <Text tone="muted">Same mindblock and receipt travel to Clinic, Self, and Relational rooms — defensibility and care in one spine.</Text>
            </Stack>
          </Surface>
        </Stack>
      </Stack>
    </Surface>
  );
}

export function FoundationDeck() {
  return (
    <Stack gap={5}>
      <OneEnginePanel />
      <FrameworkPanel />
      <UnlockPanel />
      <Surface tone="base" padding="var(--space-5)" style={{ border: "1px solid var(--color-border-default)" }}>
        <Stack inline justify="space-between" align="center">
          <Stack gap={1}>
            <Text variant="eyebrow" tone="brand">Runnable foundation</Text>
            <Text tone="muted">Target → Build → Seal paired to Pillars → Mindblocks; ready for LUMA routing and receipts.</Text>
          </Stack>
          <Stack inline gap={2}>
            <Button variant="primary"><Stack inline align="center" gap={1}><Text style={{ color: "var(--color-text-on-brand)" }}>See the framework</Text><Icon icon={ArrowRight} tone="white" /></Stack></Button>
            <Button variant="secondary">View receipts spec</Button>
          </Stack>
        </Stack>
      </Surface>
    </Stack>
  );
}

export default FoundationDeck;
