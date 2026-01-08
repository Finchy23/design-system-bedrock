import React, { useState } from 'react';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import Surface from '../primitives/Surface';
import Button from '../primitives/Button';
import Divider from '../primitives/Divider';
import Icon from '../primitives/Icon';
import {
  Activity,
  Brain,
  CheckCircle,
  ChevronRight,
  Compass,
  DoorOpen,
  Eye,
  Flame,
  Layers,
  ListChecks,
  Map,
  Play,
  Radio,
  Repeat,
  Sparkles,
  Triangle,
  Users,
  Zap
} from 'lucide-react';

const panelStyle: React.CSSProperties = {
  border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius)',
  padding: 'var(--space-4)',
  background: 'linear-gradient(135deg, rgba(87,57,251,0.08), rgba(64,224,208,0.06))',
  boxShadow: '0 14px 44px rgba(6, 12, 31, 0.22)',
  backdropFilter: 'blur(10px)'
};

const gradientShell: React.CSSProperties = {
  background: 'linear-gradient(120deg, rgba(87,57,251,0.12), rgba(64,224,208,0.1))',
  boxShadow: '0 18px 60px rgba(6, 12, 31, 0.26)'
};

const hoverMotion = (active: boolean): React.CSSProperties => ({
  transform: active ? 'translateY(-3px) scale(1.006)' : 'translateY(0)',
  boxShadow: active ? '0 20px 60px rgba(6,12,31,0.28)' : panelStyle.boxShadow,
  transition: 'transform 200ms ease, box-shadow 200ms ease'
});

const hoverGlow = (active: boolean): React.CSSProperties => ({
  opacity: active ? 0.98 : 1,
  filter: active ? 'brightness(1.02)' : 'none',
  transition: 'transform 200ms ease, box-shadow 200ms ease, opacity 200ms ease, filter 200ms ease'
});

const shimmerStyle = (active: boolean): React.CSSProperties =>
  active
    ? {
        backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.04) 100%)',
        backgroundSize: '240% 240%',
        animation: 'shimmerMove 2200ms linear infinite'
      }
    : {};

const shimmerKeyframes = `@keyframes shimmerMove { 0% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`;

export const PlaygroundShimmerStyles = () => <style>{shimmerKeyframes}</style>;

const tagStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 8px',
  borderRadius: '999px',
  border: '1px solid var(--color-border-default)',
  background: 'var(--color-bg-muted)'
};

// COMPONENT 01
export function ClinicalSpineHero() {
  const stages = [
    { key: 'problem', label: 'Problem', description: "What's breaking", icon: Flame },
    { key: 'mechanism', label: 'Mechanism', description: 'Biology/behavior shift', icon: Brain },
    { key: 'schema', label: 'Schema', description: 'Default prediction engine', icon: Map },
    { key: 'family', label: 'Family', description: 'Expression clusters', icon: Users },
    { key: 'mindblock', label: 'Mindblock', description: 'If-X-then-Y endpoint', icon: Sparkles },
    { key: 'proof', label: 'Proof', description: 'Receipts that make change auditable', icon: CheckCircle },
    { key: 'transfer', label: 'Transfer', description: 'Tests that show it holds', icon: Repeat }
  ];
  const [active, setActive] = useState('problem');
  const [hovered, setHovered] = useState<string | null>(null);
  const activeStage = stages.find((s) => s.key === active) ?? stages[0];

  return (
    <Surface tone="raised" padding="var(--space-6)" glass style={{ position: 'relative', overflow: 'hidden', ...gradientShell }}>
      <Stack gap={3}>
        <Stack inline align="center" gap={2} style={{ justifyContent: 'space-between' }}>
          <Stack gap={1}>
            <Text variant="eyebrow" tone="brand">Clinical Spine</Text>
            <Text variant="h2">Deterministic, auditable change pipeline.</Text>
            <Text tone="muted">Problem to proof, one step at a time.</Text>
          </Stack>
          <Button variant="primary">
            <Stack inline gap={1} align="center"><Text style={{ color: 'var(--color-text-on-brand)' }}>Run routing simulation</Text><Icon icon={ChevronRight} tone="white" /></Stack>
          </Button>
        </Stack>
        <Divider />
        <Stack inline gap={3} style={{ flexWrap: 'wrap' }}>
          {stages.map((stage, idx) => (
            <Surface
              key={stage.key}
              tone={active === stage.key ? 'raised' : 'base'}
              padding="var(--space-3)"
              style={{ minWidth: 160, cursor: 'pointer', borderColor: active === stage.key ? 'var(--color-brand-primary)' : undefined, ...hoverMotion(hovered === stage.key), ...hoverGlow(hovered === stage.key), ...shimmerStyle(hovered === stage.key) }}
              onClick={() => setActive(stage.key)}
              onMouseEnter={() => setHovered(stage.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Stack inline align="center" gap={2}>
                  <Icon icon={stage.icon} tone={active === stage.key ? 'brand' : 'muted'} />
                  <Text variant="meta" tone={active === stage.key ? 'brand' : 'muted'}>S{idx + 1}</Text>
                </Stack>
                <Text variant="h3">{stage.label}</Text>
                <Text tone="muted">{stage.description}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
        <Surface tone="overlay" padding="var(--space-4)" glass style={{ border: '1px dashed var(--color-border-default)', ...panelStyle }}>
          <Stack gap={2}>
            <Text variant="eyebrow" tone="brand">What we do now</Text>
            <Text variant="h3">{activeStage.label}</Text>
            <Text tone="muted">{activeStage.description}</Text>
            <Stack inline gap={2}>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={ListChecks} size="sm" tone="brand" /><Text variant="small">Proof ready</Text></Surface>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={Play} size="sm" tone="brand" /><Text variant="small">Play navicue</Text></Surface>
            </Stack>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

// COMPONENT 02
export function SchemaConstellation() {
  const nodes = [
    { id: 'S1', label: 'Immediate Relief', pillar: 'Emotional Regulation', color: 'var(--color-brand-primary)' },
    { id: 'S2', label: 'Defectiveness', pillar: 'Identity Integration', color: '#9B87F5' },
    { id: 'S3', label: 'Abandonment', pillar: 'Social Connectivity', color: '#40E0D0' },
    { id: 'S4', label: 'Mistrust', pillar: 'Social Connectivity', color: '#40E0D0' },
    { id: 'S5', label: 'Control', pillar: 'Decision Mastery', color: '#10B981' },
    { id: 'S6', label: 'Deprivation', pillar: 'Stress Resilience', color: '#F59E42' },
    { id: 'S15', label: 'Unsafe World', pillar: 'Stress Resilience', color: '#F59E42' },
    { id: 'S17', label: 'Emotional Intolerance', pillar: 'Emotional Regulation', color: 'var(--color-brand-primary)' }
  ];
  const [selected, setSelected] = useState(nodes[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Surface tone="overlay" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Text variant="eyebrow" tone="brand">Schema Constellation</Text>
        <Text variant="h3">20 predictive patterns, not diagnoses.</Text>
        <Text tone="muted">Each schema holds its own families, voices, and proof routes.</Text>
        <Stack inline gap={3} style={{ flexWrap: 'wrap' }}>
          {nodes.map((node) => (
            <Surface
              key={node.id}
              padding="var(--space-3)"
              tone={selected.id === node.id ? 'raised' : 'base'}
              style={{ minWidth: 180, borderColor: selected.id === node.id ? node.color : undefined, cursor: 'pointer', ...hoverMotion(hovered === node.id), ...hoverGlow(hovered === node.id), ...shimmerStyle(hovered === node.id) }}
              onClick={() => setSelected(node)}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Stack inline gap={2} align="center">
                  <Icon icon={Radio} tone={selected.id === node.id ? 'brand' : 'muted'} />
                  <Text variant="meta" tone="muted">{node.id}</Text>
                </Stack>
                <Text variant="h3">{node.label}</Text>
                <Text variant="small" tone="muted">Pillar: {node.pillar}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
        <Surface tone="base" padding="var(--space-4)" glass style={panelStyle}>
          <Stack gap={2}>
            <Text variant="eyebrow" tone="brand">Selected schema</Text>
            <Text variant="h3">{selected.label}</Text>
            <Text tone="muted">8 families ready. Proof routes attached.</Text>
            <Stack inline gap={2}>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={Sparkles} size="sm" tone="brand" /><Text variant="small">Show families</Text></Surface>
              <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={CheckCircle} size="sm" tone="brand" /><Text variant="small">Show proofs</Text></Surface>
            </Stack>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

// COMPONENT 03
export function FamilyTreeExplorer() {
  const schemas = [
    { id: 'S1', name: 'Immediate Relief', pillar: 'Emotional Regulation' },
    { id: 'S3', name: 'Abandonment', pillar: 'Social Connectivity' },
    { id: 'S4', name: 'Mistrust', pillar: 'Social Connectivity' }
  ];
  const families = {
    S1: ['Urgency Spike', 'Impulsive Autopilot', 'Future Discounting', 'Late Night Risk'],
    S3: ['Cling and Chase', 'Hypervigilance'],
    S4: ['Test and Retreat', 'No One Is Safe']
  } as Record<string, string[]>;
  const mindblocks = {
    'Urgency Spike': ['MB-ER-01: "I Can’t Come Down"', 'MB-DM-01: "No Gap Under Urge"'],
    'Impulsive Autopilot': ['MB-ER-04: "I Am The Urge"'],
    'Future Discounting': ['MB-ER-05: "Nothing Beyond Now"']
  } as Record<string, string[]>;

  const [schemaId, setSchemaId] = useState('S1');
  const [family, setFamily] = useState('Urgency Spike');
  const [hoverSchema, setHoverSchema] = useState<string | null>(null);
  const [hoverFamily, setHoverFamily] = useState<string | null>(null);

  const familyList = families[schemaId] ?? [];
  const mindblockList = mindblocks[family] ?? [];

  return (
    <Surface tone="base" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Text variant="h3">Schemas → Families → Mindblocks</Text>
        <Stack inline gap={3} style={{ alignItems: 'stretch' }}>
          <Surface style={{ flex: 1, ...panelStyle }} glass>
            <Text variant="eyebrow" tone="brand">Schemas</Text>
            <Stack gap={2}>
              {schemas.map((s) => (
                <Surface
                  key={s.id}
                  padding="var(--space-3)"
                  tone={schemaId === s.id ? 'raised' : 'base'}
                  style={{ cursor: 'pointer', borderColor: schemaId === s.id ? 'var(--color-brand-primary)' : undefined, ...hoverMotion(hoverSchema === s.id), ...hoverGlow(hoverSchema === s.id), ...shimmerStyle(hoverSchema === s.id) }}
                  onClick={() => { setSchemaId(s.id); setFamily(families[s.id]?.[0] ?? ''); }}
                  onMouseEnter={() => setHoverSchema(s.id)}
                  onMouseLeave={() => setHoverSchema(null)}
                >
                  <Stack gap={1}>
                    <Text variant="meta" tone="muted">{s.id}</Text>
                    <Text variant="h3">{s.name}</Text>
                    <Text variant="small" tone="muted">{s.pillar}</Text>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          </Surface>
          <Surface style={{ flex: 1, ...panelStyle }} glass>
            <Text variant="eyebrow" tone="brand">Families</Text>
            <Stack gap={2}>
              {familyList.map((f) => (
                <Surface
                  key={f}
                  padding="var(--space-3)"
                  tone={family === f ? 'raised' : 'base'}
                  style={{ cursor: 'pointer', borderColor: family === f ? 'var(--color-brand-primary)' : undefined, ...hoverMotion(hoverFamily === f), ...hoverGlow(hoverFamily === f), ...shimmerStyle(hoverFamily === f) }}
                  onClick={() => setFamily(f)}
                  onMouseEnter={() => setHoverFamily(f)}
                  onMouseLeave={() => setHoverFamily(null)}
                >
                  <Stack inline align="center" gap={2}>
                    <Icon icon={Compass} tone={family === f ? 'brand' : 'muted'} />
                    <Text variant="h3">{f}</Text>
                  </Stack>
                  <Text tone="muted">Archetype A · Heat RED</Text>
                </Surface>
              ))}
            </Stack>
          </Surface>
          <Surface style={{ flex: 1, ...panelStyle }}>
            <Text variant="eyebrow" tone="brand">Mindblocks</Text>
            <Stack gap={2}>
              {mindblockList.map((m) => (
                 <Surface key={m} padding="var(--space-3)" tone="overlay" glass style={panelStyle}>
                  <Stack gap={1}>
                    <Text variant="meta" tone="muted">{family}</Text>
                    <Text variant="h3">{m}</Text>
                    <Stack inline gap={1}>
                      <Surface padding="var(--space-2)" style={tagStyle}><Text variant="small">Heat: RED</Text></Surface>
                      <Surface padding="var(--space-2)" style={tagStyle}><Text variant="small">KBE: Believing</Text></Surface>
                    </Stack>
                    <Button variant="secondary">Expand mindblock</Button>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          </Surface>
        </Stack>
      </Stack>
    </Surface>
  );
}

// COMPONENT 04
export function SixPillarsDeepDive() {
  const pillars = [
    { id: 1, title: 'Emotional Regulation', quote: 'The body signals. You can listen and guide it.', schemas: ['S1', 'S17'], mindblocks: ['MB-ER-01', 'MB-ER-02', 'MB-ER-03'] },
    { id: 2, title: 'Stress Resilience', quote: 'Design the recovery loop.', schemas: ['S6', 'S15'], mindblocks: ['MB-SR-02'] },
    { id: 3, title: 'Social Connectivity', quote: 'Repair and rejoin.', schemas: ['S3', 'S4'], mindblocks: ['MB-SC-01'] },
    { id: 4, title: 'Cognitive Reframing', quote: 'Shift the meaning.', schemas: ['S5'], mindblocks: ['MB-CR-01'] },
    { id: 5, title: 'Identity Integration', quote: 'Coherent self-story.', schemas: ['S2'], mindblocks: [] },
    { id: 6, title: 'Decision Mastery', quote: 'Build gaps under heat.', schemas: ['S1'], mindblocks: ['MB-DM-01'] }
  ];
  const [active, setActive] = useState(1);
  const activePillar = pillars.find((p) => p.id === active) ?? pillars[0];

  return (
    <Surface tone="overlay" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Stack inline gap={2} align="center" style={{ justifyContent: 'space-between' }}>
          <Text variant="h3">Six pillars. Physiology up to identity.</Text>
          <Stack inline gap={1} align="center">
            {pillars.map((p) => (
              <div key={p.id} style={{ width: 10, height: 10, borderRadius: 10, background: p.id === active ? 'var(--color-brand-primary)' : 'var(--color-border-default)', cursor: 'pointer' }} onClick={() => setActive(p.id)} />
            ))}
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Text variant="eyebrow" tone="brand">Pillar {active}</Text>
          <Text variant="h2">{activePillar.title}</Text>
          <Text tone="muted">{activePillar.quote}</Text>
          <Stack inline gap={2}>
            <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={Activity} size="sm" tone="brand" /><Text variant="small">Schemas: {activePillar.schemas.join(', ')}</Text></Surface>
            <Surface padding="var(--space-2)" style={tagStyle}><Icon icon={ListChecks} size="sm" tone="brand" /><Text variant="small">Mindblocks: {activePillar.mindblocks.join(', ') || 'TBD'}</Text></Surface>
          </Stack>
          <Divider />
          <Stack gap={2}>
            <Text variant="meta" tone="muted">How it works</Text>
            <Text>Orient → Downshift → Capture receipt.</Text>
            <Surface tone="base" padding="var(--space-3)" glass style={panelStyle}>
              <Text variant="small" tone="muted">Animated descent: RED → AMBER → GREEN · 0-180s</Text>
            </Surface>
          </Stack>
          <Button variant="secondary">Open pillar detail</Button>
        </Stack>
      </Stack>
    </Surface>
  );
}

// COMPONENT 05
export function VoiceTaxonomy() {
  const voices = [
    { id: 'clinician', name: 'Clinician', stance: 'Attuned Therapist', color: '#5739FB', description: 'Warm, clear, structuring. Explains mechanism and offers the move.', when: ['Amber/Green states', 'First contact', 'Teaching moment'], pairings: ['Name Pattern', 'Orient', 'Make Move'] },
    { id: 'witness', name: 'Witness', stance: 'Compassionate', color: '#40E0D0', description: 'Sees without judgement, holds space.', when: ['High arousal', 'After rupture'], pairings: ['Witness', 'Capture Receipt'] },
    { id: 'coach', name: 'Coach', stance: 'Agency Builder', color: '#10B981', description: 'Action-forward, keeps tempo.', when: ['Green states', 'Transfer tests'], pairings: ['Make Move', 'Transfer'] },
    { id: 'sage', name: 'Sage', stance: 'Perspective Shifter', color: '#9B87F5', description: 'Zooms out, reframes meaning.', when: ['Identity work'], pairings: ['Reframe', 'Belief Probe'] },
    { id: 'nurturer', name: 'Nurturer', stance: 'Co-regulator', color: '#F59E42', description: 'Softens, soothes, co-regulates.', when: ['Red states'], pairings: ['Orient', 'Downshift'] },
    { id: 'straight', name: 'Straight Talk', stance: 'Reality Anchor', color: '#DC2626', description: 'Direct, boundaried, crisp.', when: ['Boundaries', 'Slip spiral'], pairings: ['Boundary', 'Test'] }
  ];
  const [active, setActive] = useState('clinician');
  const activeVoice = voices.find((v) => v.id === active) ?? voices[0];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Surface tone="raised" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Text variant="h3">Eight clinical stances.</Text>
        <Text tone="muted">Choose the stance that fits the heat and the job.</Text>
        <Stack inline gap={3} style={{ flexWrap: 'wrap' }}>
          {voices.map((v) => (
            <Surface
              key={v.id}
              padding="var(--space-3)"
              tone={active === v.id ? 'raised' : 'base'}
              glass
              style={{ minWidth: 160, cursor: 'pointer', borderColor: active === v.id ? v.color : undefined, ...panelStyle, ...hoverMotion(hovered === v.id), ...hoverGlow(hovered === v.id), ...shimmerStyle(hovered === v.id) }}
              onClick={() => setActive(v.id)}
              onMouseEnter={() => setHovered(v.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <div style={{ ...tagStyle, background: v.color, color: 'var(--color-text-on-brand)', borderColor: v.color }}>
                  <Text variant="small" style={{ color: 'var(--color-text-on-brand)' }}>{v.name}</Text>
                </div>
                <Text variant="small" tone="muted">{v.stance}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
        <Surface tone="overlay" padding="var(--space-4)" glass style={{ border: '1px dashed var(--color-border-default)', ...panelStyle }}>
          <Stack gap={2}>
            <Text variant="eyebrow" tone="brand">{activeVoice.name}</Text>
            <Text>{activeVoice.description}</Text>
            <Text variant="small" tone="muted">When to use: {activeVoice.when.join(' · ')}</Text>
            <Stack inline gap={1}>
              {activeVoice.pairings.map((p) => (
                <Surface key={p} padding="var(--space-2)" style={tagStyle}><Text variant="small">{p}</Text></Surface>
              ))}
            </Stack>
            <Button variant="secondary">Play 0:32 sample</Button>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

// COMPONENT 06
export function PrimitiveLibrary() {
  const primitives = [
    { id: 'orient', title: 'Orient', summary: 'Notice where you are', icon: Compass },
    { id: 'downshift', title: 'Downshift', summary: 'Reduce arousal', icon: Flame },
    { id: 'make-move', title: 'Make Move', summary: 'Take one action', icon: ChevronRight },
    { id: 'repair', title: 'Repair', summary: 'Return to connection', icon: Repeat },
    { id: 'name-pattern', title: 'Name Pattern', summary: 'Identify the loop', icon: ListChecks },
    { id: 'witness', title: 'Witness', summary: 'See without judgement', icon: Eye },
    { id: 'capture', title: 'Capture Receipt', summary: 'Log the proof', icon: CheckCircle },
    { id: 'transfer', title: 'Transfer Test', summary: 'Repeat in new context', icon: Layers }
  ];
  const [active, setActive] = useState('orient');
  const activePrimitive = primitives.find((p) => p.id === active) ?? primitives[0];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Surface tone="base" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Text variant="h3">Primitive actions — smallest moves.</Text>
        <Text tone="muted">Pick the move, then pair voice and proof.</Text>
        <Stack inline gap={2} style={{ flexWrap: 'wrap' }}>
          {primitives.map((p) => (
            <Surface
              key={p.id}
              padding="var(--space-3)"
              tone={active === p.id ? 'raised' : 'base'}
              glass
              style={{ minWidth: 150, cursor: 'pointer', borderColor: active === p.id ? 'var(--color-brand-primary)' : undefined, ...panelStyle, ...hoverMotion(hovered === p.id), ...hoverGlow(hovered === p.id), ...shimmerStyle(hovered === p.id) }}
              onClick={() => setActive(p.id)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack gap={1}>
                <Icon icon={p.icon} tone={active === p.id ? 'brand' : 'muted'} />
                <Text variant="h3">{p.title}</Text>
                <Text variant="small" tone="muted">{p.summary}</Text>
              </Stack>
            </Surface>
          ))}
        </Stack>
        <Surface tone="overlay" padding="var(--space-4)" glass style={panelStyle}>
          <Stack gap={2}>
            <Text variant="eyebrow" tone="brand">{activePrimitive.title}</Text>
            <Text>{activePrimitive.summary}</Text>
            <Text variant="small" tone="muted">When to use: Heat RED/AMBER · Proof required: pre/post state delta</Text>
            <Stack inline gap={2}>
              <Button variant="secondary">Play navicue</Button>
              <Button variant="primary"><Text style={{ color: 'var(--color-text-on-brand)' }}>Use this primitive</Text></Button>
            </Stack>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

// COMPONENT 07
export function RoutingEngine() {
  const archetypes = [
    { key: 'A', title: 'Urgency Spike', heat: 'RED', voices: ['Nurturer', 'Clinician'], primitives: ['Orient', 'Downshift'], families: ['S1-F1', 'S1-F3', 'S3-F2', 'S6-F6'] },
    { key: 'B', title: 'Rumination', heat: 'AMBER', voices: ['Witness', 'Clinician'], primitives: ['Witness', 'Name Pattern'], families: ['S5-F2'] },
    { key: 'C', title: 'Shame & Self Attack', heat: 'AMBER', voices: ['Clinician', 'Straight Talk'], primitives: ['Name Pattern', 'Repair'], families: ['S2-F1'] }
  ];
  const [active, setActive] = useState('A');
  const selected = archetypes.find((a) => a.key === active) ?? archetypes[0];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Surface tone="overlay" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Text variant="h3">Route by archetype, not by content.</Text>
        <Text tone="muted">Heat + KBE + schema → archetype → primitives, voice, proof.</Text>
        <Stack inline gap={3} style={{ alignItems: 'stretch' }}>
          <Surface style={{ flex: 1, ...panelStyle }} glass>
            <Text variant="eyebrow" tone="brand">Archetypes</Text>
            <Stack gap={2}>
              {archetypes.map((a) => (
                <Surface
                  key={a.key}
                  padding="var(--space-3)"
                  tone={a.key === active ? 'raised' : 'base'}
                  style={{ cursor: 'pointer', borderColor: a.key === active ? 'var(--color-brand-primary)' : undefined, ...hoverMotion(hovered === a.key), ...hoverGlow(hovered === a.key), ...shimmerStyle(hovered === a.key) }}
                  onClick={() => setActive(a.key)}
                  onMouseEnter={() => setHovered(a.key)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Stack inline gap={2} align="center">
                    <Icon icon={Layers} tone={a.key === active ? 'brand' : 'muted'} />
                    <Text variant="h3">{a.title}</Text>
                  </Stack>
                  <Text tone="muted">Default heat: {a.heat}</Text>
                </Surface>
              ))}
            </Stack>
          </Surface>
          <Surface style={{ flex: 2, ...panelStyle }} glass>
            <Text variant="eyebrow" tone="brand">Routing Logic</Text>
            <Stack gap={2}>
              <Text variant="h3">Archetype {selected.key}: {selected.title}</Text>
              <Stack inline gap={2}>
                <Surface padding="var(--space-2)" style={tagStyle}><Text variant="small">Heat: {selected.heat}</Text></Surface>
                <Surface padding="var(--space-2)" style={tagStyle}><Text variant="small">Voices: {selected.voices.join(', ')}</Text></Surface>
              </Stack>
              <Text tone="muted">Primary primitives: {selected.primitives.join(' → ')}</Text>
              <Text tone="muted">Families: {selected.families.join(' · ')}</Text>
              <Divider />
              <Stack gap={2}>
                <Text variant="meta" tone="muted">Simulate routing</Text>
                <Surface tone="base" padding="var(--space-3)">
                  <Text variant="small">Input: Heat RED · Schema S1 · KBE: Believing</Text>
                  <Text variant="small" tone="muted">Result: Archetype {selected.key} → {selected.primitives.join(' → ')} · {selected.voices[0]} voice</Text>
                  <Button variant="secondary" style={{ marginTop: 'var(--space-2)' }}>Run simulation</Button>
                </Surface>
              </Stack>
            </Stack>
          </Surface>
        </Stack>
      </Stack>
    </Surface>
  );
}

// COMPONENT 08
export function ProofTransferSystem() {
  const proofs = [
    { title: '90-second timer', detail: 'Start 8/10 → End 4/10 · delta -4', icon: Activity },
    { title: 'Voice soundbite', detail: '0:32 sample · Witness voice', icon: Play },
    { title: 'Message sent receipt', detail: 'Repair note sent · outcome pending', icon: Radio },
    { title: 'Attendance log', detail: 'Sessions 12/13 · streak 6 days', icon: ListChecks },
    { title: 'Pre/post state delta', detail: 'Anxious 7/10 → Grounded 3/10', icon: CheckCircle }
  ];
  const transfers = [
    { title: 'Same day, different context', detail: 'Kitchen ✓ · Car ▢ · Bedroom ▢', icon: Compass },
    { title: 'Second forecast within 48h', detail: 'Work ✓ · Social due in 24h', icon: Triangle },
    { title: 'Repair after next rupture', detail: 'Window 48h · in progress', icon: Repeat },
    { title: 'Next boundary within 7 days', detail: 'Day 1 set ✓ · Day 7 due', icon: Layers },
    { title: 'Repeat 3× this week', detail: 'Mon ✓ · Wed ✓ · Fri pending', icon: Sparkles }
  ];

  const [hoverProof, setHoverProof] = useState<string | null>(null);
  const [hoverTransfer, setHoverTransfer] = useState<string | null>(null);

  return (
    <Surface tone="base" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Text variant="h3">Proof + Transfer System</Text>
        <Text tone="muted">Proof makes change auditable. Transfer makes it real.</Text>
        <Stack inline gap={3} style={{ alignItems: 'stretch' }}>
          <Surface style={{ flex: 1, ...panelStyle }} glass>
            <Text variant="eyebrow" tone="brand">Proof Artifacts</Text>
            <Stack gap={2}>
              {proofs.map((p) => (
                <Surface
                  key={p.title}
                  tone="overlay"
                  padding="var(--space-3)"
                  glass
                  style={{ ...panelStyle, ...hoverMotion(hoverProof === p.title), ...hoverGlow(hoverProof === p.title), ...shimmerStyle(hoverProof === p.title) }}
                  onMouseEnter={() => setHoverProof(p.title)}
                  onMouseLeave={() => setHoverProof(null)}
                >
                  <Stack inline align="center" gap={2}>
                    <Icon icon={p.icon} tone="brand" />
                    <Stack gap={1}>
                      <Text variant="h3">{p.title}</Text>
                      <Text variant="small" tone="muted">{p.detail}</Text>
                      <Button variant="secondary">Log receipt</Button>
                    </Stack>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          </Surface>
          <Surface style={{ flex: 1, ...panelStyle }} glass>
            <Text variant="eyebrow" tone="brand">Transfer Tests</Text>
            <Stack gap={2}>
              {transfers.map((t) => (
                <Surface
                  key={t.title}
                  tone="overlay"
                  padding="var(--space-3)"
                  glass
                  style={{ ...panelStyle, ...hoverMotion(hoverTransfer === t.title), ...hoverGlow(hoverTransfer === t.title), ...shimmerStyle(hoverTransfer === t.title) }}
                  onMouseEnter={() => setHoverTransfer(t.title)}
                  onMouseLeave={() => setHoverTransfer(null)}
                >
                  <Stack inline align="center" gap={2}>
                    <Icon icon={t.icon} tone="brand" />
                    <Stack gap={1}>
                      <Text variant="h3">{t.title}</Text>
                      <Text variant="small" tone="muted">{t.detail}</Text>
                      <Button variant="secondary">Start transfer test</Button>
                    </Stack>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          </Surface>
        </Stack>
      </Stack>
    </Surface>
  );
}

// COMPONENT 09
export function HeatKbeMatrix() {
  const cells = [
    { heat: 'RED', kbe: 'KNOWING', title: 'Orient', items: 2 },
    { heat: 'RED', kbe: 'BELIEVING', title: 'Downshift', items: 5 },
    { heat: 'RED', kbe: 'EMBODYING', title: '90-sec timer', items: 3 },
    { heat: 'AMBER', kbe: 'KNOWING', title: 'Name Pattern', items: 6 },
    { heat: 'AMBER', kbe: 'BELIEVING', title: 'Witness', items: 8 },
    { heat: 'AMBER', kbe: 'EMBODYING', title: 'Repair', items: 4 },
    { heat: 'GREEN', kbe: 'KNOWING', title: 'Witness', items: 4 },
    { heat: 'GREEN', kbe: 'BELIEVING', title: 'Make Move', items: 7 },
    { heat: 'GREEN', kbe: 'EMBODYING', title: 'Transfer Test', items: 9 }
  ];
  const [selected, setSelected] = useState('RED-BELIEVING');
  const selectedCell = cells.find((c) => `${c.heat}-${c.kbe}` === selected) ?? cells[1];
  const [hovered, setHovered] = useState<string | null>(null);

  const renderCell = (cell: typeof cells[number]) => {
    const key = `${cell.heat}-${cell.kbe}`;
    const active = key === selected;
    return (
      <Surface
        key={key}
        tone={active ? 'raised' : 'base'}
        padding="var(--space-3)"
        style={{ cursor: 'pointer', minWidth: 180, borderColor: active ? 'var(--color-brand-primary)' : undefined, ...hoverMotion(hovered === key || active), ...hoverGlow(hovered === key || active), ...shimmerStyle(hovered === key) }}
        onClick={() => setSelected(key)}
        onMouseEnter={() => setHovered(key)}
        onMouseLeave={() => setHovered(null)}
      >
        <Stack gap={1}>
          <Text variant="meta" tone="muted">{cell.heat} × {cell.kbe}</Text>
          <Text variant="h3">{cell.title}</Text>
          <Text variant="small" tone="muted">{cell.items} mindblocks</Text>
        </Stack>
      </Surface>
    );
  };

  return (
    <Surface tone="raised" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Text variant="h3">State-based routing. Do not think in a fire.</Text>
        <Stack gap={2}>
          <Stack inline gap={2} style={{ flexWrap: 'wrap' }}>
            {cells.map(renderCell)}
          </Stack>
          <Surface tone="overlay" padding="var(--space-4)" glass style={{ border: '1px dashed var(--color-border-default)', ...panelStyle }}>
            <Stack gap={2}>
              <Text variant="eyebrow" tone="brand">{selectedCell.heat} × {selectedCell.kbe}</Text>
              <Text tone="muted">Primary primitives: Downshift → Orient · Voices: Nurturer, Clinician</Text>
              <Surface tone="base" padding="var(--space-3)">
                <Text variant="small">MB-ER-01: "I Can't Come Down"</Text>
                <Text variant="small" tone="muted">States shift; I can shorten the half-life.</Text>
              </Surface>
              <Button variant="secondary">Back to matrix</Button>
            </Stack>
          </Surface>
        </Stack>
      </Stack>
    </Surface>
  );
}

// COMPONENT 10
export function FourLayerArchitecture() {
  const layers = [
    { id: 1, title: 'Command Center 2 (CC2)', summary: 'Control plane · Truth · Governance', icon: Layers, detail: ['Content governance', 'Journey design', 'Platform health', 'Five Vows compliance'] },
    { id: 2, title: 'LUMA', summary: 'AI orchestration · Decision OS · WhyNow', icon: Brain, detail: ['Decision trees', 'Eligibility thresholds', 'Content selection'] },
    { id: 3, title: '6S Orbit', summary: 'Daily lived OS · Home screen', icon: Compass, detail: ['Station', 'Soundtracks', 'Story', 'Sticky Notes', 'Shelf', 'Search'] },
    { id: 4, title: 'Rooms', summary: 'Journeys · NaviCues · Toolkit', icon: DoorOpen, detail: ['Journey arcs', 'NaviCue delivery', 'State view', 'Momentum'] }
  ];
  const [active, setActive] = useState(1);
  const activeLayer = layers.find((l) => l.id === active) ?? layers[0];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Surface tone="overlay" padding="var(--space-5)" glass style={gradientShell}>
      <Stack gap={3}>
        <Text variant="h3">How everything connects.</Text>
        <Stack gap={2}>
          {layers.map((layer) => (
            <Surface
              key={layer.id}
              padding="var(--space-3)"
              tone={layer.id === active ? 'raised' : 'base'}
              glass
              style={{ cursor: 'pointer', borderColor: layer.id === active ? 'var(--color-brand-primary)' : undefined, ...panelStyle, ...hoverMotion(hovered === layer.id || layer.id === active), ...hoverGlow(hovered === layer.id || layer.id === active), ...shimmerStyle(hovered === layer.id) }}
              onClick={() => setActive(layer.id)}
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Stack inline align="center" gap={2}>
                <Icon icon={layer.icon} tone={layer.id === active ? 'brand' : 'muted'} />
                <Text variant="h3">Layer {layer.id}: {layer.title}</Text>
              </Stack>
              <Text tone="muted">{layer.summary}</Text>
            </Surface>
          ))}
        </Stack>
        <Surface tone="base" padding="var(--space-4)" glass style={panelStyle}>
          <Stack gap={2}>
            <Text variant="eyebrow" tone="brand">Layer {activeLayer.id} Detail</Text>
            <Text>{activeLayer.summary}</Text>
            <Stack inline gap={1} style={{ flexWrap: 'wrap' }}>
              {activeLayer.detail.map((item) => (
                <Surface key={item} padding="var(--space-2)" style={tagStyle}><Text variant="small">{item}</Text></Surface>
              ))}
            </Stack>
            <Stack inline gap={2}>
              <Button variant="secondary">Expand layer</Button>
              <Button variant="primary"><Text style={{ color: 'var(--color-text-on-brand)' }}>Simulate flow</Text></Button>
            </Stack>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
}

export default {
  ClinicalSpineHero,
  SchemaConstellation,
  FamilyTreeExplorer,
  SixPillarsDeepDive,
  VoiceTaxonomy,
  PrimitiveLibrary,
  RoutingEngine,
  ProofTransferSystem,
  HeatKbeMatrix,
  FourLayerArchitecture
};
