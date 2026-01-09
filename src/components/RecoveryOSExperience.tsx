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
  CheckCircle,
  Compass,
  FileLock,
  Flame,
  HeartPulse,
  Layers,
  ListChecks,
  Map,
  Radio,
  Sparkles,
  Zap
} from "lucide-react";

const tagStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 10px",
  borderRadius: "999px",
  border: "1px solid var(--color-border-default)",
  background: "var(--color-bg-muted)"
};

const cardHover = (active: boolean): React.CSSProperties => ({
  transform: active ? "translateY(-4px)" : "translateY(0)",
  boxShadow: active ? "0 18px 50px rgba(6,12,31,0.18)" : "0 10px 28px rgba(6,12,31,0.12)",
  transition: "transform var(--motion-fast) ease, box-shadow var(--motion-fast) ease"
});

const gradientShell: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(87,57,251,0.08), rgba(64,224,208,0.08))",
  boxShadow: "0 16px 48px rgba(6,12,31,0.16)",
  border: "1px solid var(--color-border-default)",
  borderRadius: "var(--radius)"
};

export function RecoveryOSExperience() {
  const [hovered, setHovered] = useState<string | null>(null);

  const tenets = useMemo(
    () => [
      { title: "Safety-first", desc: "Consent, appropriateness, human boundary before speed.", icon: HeartPulse },
      { title: "Minimal moves", desc: "Smallest runnable primitive with a defined heat band and exit.", icon: Activity },
      { title: "Proof-first", desc: "Every move pairs to a receipt the nervous system and clinician trust.", icon: CheckCircle },
      { title: "Transferable", desc: "Receipts and IDs travel across rooms; progress compounds.", icon: ArrowRight },
      { title: "One Surface Rule", desc: "One elevated surface; interface defers to content.", icon: Layers },
      { title: "Token Rule", desc: "All color/type/space/motion from tokens; CI guards drift.", icon: FileLock }
    ],
    []
  );

  const system = useMemo(
    () => [
      { title: "State sensing", detail: "Real-time read with heat bands and consent." },
      { title: "Routing", detail: "LUMA selects next primitive with dose/target." },
      { title: "Delivery primitives", detail: "NaviCues, Journeys, Mindblocks, Schemas." },
      { title: "Proof capture", detail: "Pre/Post, receipt ID, mindblock ID, provenance." },
      { title: "Transfer", detail: "Receipts travel across Clinic / Self / Relational rooms." },
      { title: "Governance", detail: "CI locks spine/tokens; escalation & consent enforced." }
    ],
    []
  );

  const loop = useMemo(
    () => [
      { title: "Sense", desc: "State-first. Heat-aware. Consent-bound.", icon: Radio },
      { title: "Route", desc: "Right primitive, dose, timing in real time.", icon: Compass },
      { title: "Deliver", desc: "Place the move inside real life; match the window.", icon: Map },
      { title: "Seal", desc: "Capture the receipt; stack proof; identity follows.", icon: BadgeCheck }
    ],
    []
  );

  const checklist = useMemo(
    () => [
      "Consent set + cadence rule applied",
      "State captured; heat band defined",
      "Move chosen with dose/target; appropriateness passed",
      "Proof pre/post captured; receipt + mindblock IDs logged",
      "Receipt routed to right room; provenance intact",
      "Safety ready: escalation + human boundary respected"
    ],
    []
  );

  return (
    <Surface tone="overlay" padding="var(--space-6)" glass style={{ ...gradientShell, position: "relative", overflow: "hidden" }}>
      <Stack gap={5}>
        <Stack gap={2}>
          <Text variant="eyebrow" tone="brand">RecoveryOS</Text>
          <Text variant="h1">Quiet, safe, provable change — in motion.</Text>
          <Text tone="muted">A guided walkthrough of the operating spine: why now, how it runs, and how we keep it auditable.</Text>
          <Stack inline gap={2} align="center">
            <Button variant="primary"><Stack inline align="center" gap={1}><Text style={{ color: "var(--color-text-on-brand)" }}>Start the loop</Text><Icon icon={ArrowRight} tone="white" /></Stack></Button>
            <Button variant="secondary">View receipts spec</Button>
          </Stack>
        </Stack>

        <Divider />

        <Surface tone="base" padding="var(--space-5)" style={{ borderColor: "var(--color-border-default)" }}>
          <Stack gap={3}>
            <Stack inline align="center" gap={2}><Icon icon={Sparkles} tone="brand" /><Text variant="h2">Why this works</Text></Stack>
            <Text tone="muted">Real-time neuroadaptive delivery meets auditable proof. The spine routes moves, captures receipts, and transfers progress across rooms.</Text>
            <Stack inline gap={2} style={{ flexWrap: "wrap" }}>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={Flame} size="sm" tone="brand" /><Text variant="small">Heat-aware</Text></Surface>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={Brain} size="sm" tone="brand" /><Text variant="small">Biology-first</Text></Surface>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={ListChecks} size="sm" tone="brand" /><Text variant="small">Proof-attached</Text></Surface>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={Anchor} size="sm" tone="brand" /><Text variant="small">Transferable</Text></Surface>
            </Stack>
          </Stack>
        </Surface>

        <Surface tone="base" padding="var(--space-5)" style={{ borderColor: "var(--color-border-default)" }}>
          <Stack gap={3}>
            <Stack inline align="center" gap={2}><Icon icon={Layers} tone="brand" /><Text variant="h2">System Stack</Text></Stack>
            <Text tone="muted">From sensing to governance with a stable spine, token-locked visuals, and receipts that travel.</Text>
            <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
              {system.map((item) => (
                <Surface
                  key={item.title}
                  padding="var(--space-4)"
                  tone="base"
                  style={{ minWidth: 220, ...cardHover(hovered === item.title), cursor: "default" }}
                  onMouseEnter={() => setHovered(item.title)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Stack gap={1}>
                    <Text variant="h3">{item.title}</Text>
                    <Text tone="muted">{item.detail}</Text>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          </Stack>
        </Surface>

        <Surface tone="overlay" padding="var(--space-5)" glass style={{ borderColor: "var(--color-border-default)" }}>
          <Stack gap={3}>
            <Stack inline align="center" gap={2}><Icon icon={Compass} tone="brand" /><Text variant="h2">One flow. Four moves.</Text></Stack>
            <Text tone="muted">Sense → Route → Deliver → Seal. Tiny moves, real conditions, stacked proof.</Text>
            <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
              {loop.map((item) => (
                <Surface
                  key={item.title}
                  padding="var(--space-4)"
                  tone="raised"
                  style={{ minWidth: 200, ...cardHover(hovered === item.title), cursor: "default" }}
                  onMouseEnter={() => setHovered(item.title)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Stack gap={1}>
                    <Stack inline align="center" gap={2}>
                      <Icon icon={item.icon} tone="brand" />
                      <Text variant="meta" tone="muted">{item.title}</Text>
                    </Stack>
                    <Text variant="h3">{item.title}</Text>
                    <Text tone="muted">{item.desc}</Text>
                  </Stack>
                </Surface>
              ))}
            </Stack>
            <Surface tone="base" padding="var(--space-4)" style={{ border: "1px dashed var(--color-border-default)" }}>
              <Stack gap={1}>
                <Text variant="eyebrow" tone="brand">Apple bar • in-product feel</Text>
                <Text tone="muted">State check → NaviCue surfaces → Move with heat band → Proof request (pre/post) → Receipt logs → Clinician sees state/aim/dose/target + hold-under-pressure note.</Text>
              </Stack>
            </Surface>
          </Stack>
        </Surface>

        <Surface tone="base" padding="var(--space-5)" style={{ borderColor: "var(--color-border-default)" }}>
          <Stack gap={3}>
            <Stack inline align="center" gap={2}><Icon icon={Sparkles} tone="brand" /><Text variant="h2">Design Tenets</Text></Stack>
            <Text tone="muted">The guardrails that keep the experience quiet, clear, and provable.</Text>
            <Stack inline gap={3} style={{ flexWrap: "wrap" }}>
              {tenets.map((tenet) => (
                <Surface
                  key={tenet.title}
                  padding="var(--space-4)"
                  tone="base"
                  style={{ minWidth: 220, ...cardHover(hovered === tenet.title), cursor: "default" }}
                  onMouseEnter={() => setHovered(tenet.title)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Stack gap={1}>
                    <Stack inline align="center" gap={2}>
                      <Icon icon={tenet.icon} tone="brand" />
                      <Text variant="meta" tone="muted">{tenet.title}</Text>
                    </Stack>
                    <Text variant="h3">{tenet.title}</Text>
                    <Text tone="muted">{tenet.desc}</Text>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          </Stack>
        </Surface>

        <Surface tone="overlay" padding="var(--space-5)" glass style={{ borderColor: "var(--color-border-default)" }}>
          <Stack gap={3}>
            <Stack inline align="center" gap={2}><Icon icon={ListChecks} tone="brand" /><Text variant="h2">Operational Review Checklist</Text></Stack>
            <Text tone="muted">A fast pre-flight before any delivery or audit.</Text>
            <Stack gap={2}>
              {checklist.map((item) => (
                <Surface key={item} padding="var(--space-3)" tone="base" style={{ ...cardHover(hovered === item) }} onMouseEnter={() => setHovered(item)} onMouseLeave={() => setHovered(null)}>
                  <Stack inline align="center" gap={2}>
                    <Icon icon={CheckCircle} tone="brand" />
                    <Text>{item}</Text>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          </Stack>
        </Surface>

        <Surface tone="base" padding="var(--space-5)" style={{ borderColor: "var(--color-border-default)" }}>
          <Stack gap={2}>
            <Text variant="eyebrow" tone="brand">Signal / Receipt Spec</Text>
            <Text tone="muted">Receipt ID · Mindblock ID · Journey ID · State · Aim · Dose · Target · Held-under-pressure note · Pre · Post · Timestamp · Location/room · Agent · Provenance (consent mode, cadence rule, escalation rule) · Outcome (held/degraded/failed).</Text>
            <Stack inline gap={2}>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={FileLock} size="sm" tone="brand" /><Text variant="small">Auditable</Text></Surface>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={Zap} size="sm" tone="brand" /><Text variant="small">Transfer-ready</Text></Surface>
            </Stack>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

export default RecoveryOSExperience;
