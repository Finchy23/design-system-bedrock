import type { Meta, StoryObj } from '@storybook/react';
import RecoveryLoopInstrument from './RecoveryLoopInstrument';

const meta: Meta<typeof RecoveryLoopInstrument> = {
  title: 'Experience/RecoveryLoopInstrument',
  component: RecoveryLoopInstrument,
  argTypes: {
    mode: { control: { type: 'select' }, options: ['companion', 'clinician'] },
    heat: { control: { type: 'select' }, options: ['green', 'amber', 'red'] },
    mttrSeconds: { control: { type: 'number' } },
    mttrDelta: { control: { type: 'number' } },
    mttrHistory: { control: { type: 'object' } },
    transferStreak: { control: { type: 'number' } },
    resistanceBadge: { control: { type: 'object' } },
    proofBadge: { control: { type: 'object' } },
    schema: { control: { type: 'text' } },
    family: { control: { type: 'text' } },
    mindblock: { control: { type: 'text' } },
    move: { control: { type: 'text' } },
    stance: { control: { type: 'select' }, options: ['clinician', 'coach', 'nurturer', 'witness', 'sage', 'straight', 'paradox', 'elder'] },
    receipts: { control: { type: 'object' } },
    transfer: { control: { type: 'object' } },
    safeStates: { control: { type: 'object' } },
    pillar: { control: { type: 'text' } },
    concept: { control: { type: 'text' } },
    theme: { control: { type: 'text' } },
    audio: { control: { type: 'select' }, options: ['none', 'spark', 'flame', 'ember'] },
    resistance: { control: { type: 'boolean' } },
    resistanceNotes: { control: { type: 'object' } },
    resistanceTimeline: { control: { type: 'object' } },
    whyLine: { control: { type: 'text' } },
    companionProofChip: { control: { type: 'text' } },
    isMobile: { control: { type: 'boolean' } },
    pinnedCTA: { control: { type: 'boolean' } },
    compressProof: { control: { type: 'boolean' } },
    proofSubtitle: { control: { type: 'text' } },
  }
};

export default meta;

export const Clinician: StoryObj<typeof RecoveryLoopInstrument> = {
  args: {
    mode: 'clinician',
    heat: 'amber',
    mttrSeconds: 210,
    mttrDelta: -14,
    mttrHistory: [360, 320, 290, 260, 240, 210],
    transferStreak: 3,
    resistanceBadge: { count: 1, last: '2h ago' },
    proofBadge: { completed: 1, total: 3 },
    schema: 'S3 Abandonment',
    family: 'F4 Leave First',
    mindblock: 'MB-S3-F4-02',
    move: 'Orient → Downshift',
    stance: 'clinician',
    receipts: [
      { key: 'receipt-1', label: 'Pre/Post State', state: 'captured' },
      { key: 'receipt-2', label: '90s Rescue', state: 'pending' },
      { key: 'receipt-3', label: 'Voice Note', state: 'pending' }
    ],
    transfer: { key: 'transfer-1', label: 'Repeat in new context', state: 'pending' },
    safeStates: ['green', 'amber'],
    pillar: 'Emotional Regulation',
    concept: 'Arousal Modulation',
    theme: 'State Matching',
    audio: 'flame',
    resistance: false,
    whyLine: 'Heat is high. Short moves land best here.',
    proofSubtitle: 'Proof starts with receipts.',
    onWhyThis: () => {},
    onEscalate: () => {},
    isMobile: false
  }
};

export const Companion: StoryObj<typeof RecoveryLoopInstrument> = {
  args: {
    mode: 'companion',
    heat: 'green',
    mttrSeconds: 120,
    mttrHistory: [260, 200, 160, 140, 120],
    transferStreak: 2,
    resistanceBadge: { count: 0 },
    proofBadge: { completed: 2, total: 3 },
    schema: 'S1 Immediate Relief',
    family: 'F1 Urgency Spike',
    mindblock: 'MB-ER-01',
    move: 'Downshift',
    stance: 'nurturer',
    receipts: [
      { key: 'receipt-1', label: 'Breath Receipt', state: 'captured' },
      { key: 'receipt-2', label: 'Before/After Intensity', state: 'captured' }
    ],
    transfer: { key: 'transfer-1', label: 'Repeat later today', state: 'pending' },
    safeStates: ['green', 'amber'],
    pillar: 'Emotional Regulation',
    concept: 'Arousal Modulation',
    theme: 'State Matching',
    audio: 'spark',
    resistance: false,
    whyLine: 'State-matched downshift to shorten the spike.',
    proofSubtitle: 'Default forming.',
    onNextMove: () => {},
    isMobile: true,
    pinnedCTA: true,
    compressProof: true,
    companionProofChip: 'Proof 2/3'
  }
};

export const Resistance: StoryObj<typeof RecoveryLoopInstrument> = {
  args: {
    mode: 'clinician',
    heat: 'red',
    mttrSeconds: 480,
    mttrDelta: 36,
    mttrHistory: [240, 260, 320, 380, 480],
    transferStreak: 0,
    resistanceBadge: { count: 2, last: 'Today' },
    proofBadge: { completed: 0, total: 3 },
    schema: 'S4 Mistrust',
    family: 'F2 Armor Mode',
    mindblock: 'MB-S4-F2-03',
    move: 'Witness + Repair',
    stance: 'witness',
    receipts: [
      { key: 'receipt-1', label: 'Anchor Found', state: 'failed' },
      { key: 'receipt-2', label: 'Repair Script', state: 'pending' }
    ],
    transfer: { key: 'transfer-1', label: 'Repeat with partner', state: 'pending' },
    safeStates: ['green'],
    pillar: 'Social Connectivity',
    concept: 'Attachment Safety',
    theme: 'Co-Regulation',
    audio: 'ember',
    resistance: true,
    resistanceNotes: ['Repair attempts rejected', 'Heat stayed red after 2 cues'],
    resistanceTimeline: [
      { ts: 'Today 14:10', note: 'Escalation offered, declined' },
      { ts: 'Today 09:20', note: 'Repair script stalled' },
      { ts: 'Yesterday', note: 'Heat stayed red after 2 cues' }
    ],
    proofSubtitle: 'Held outside the app.',
    onEscalate: () => {}
  }
};

export const Controls: StoryObj<typeof RecoveryLoopInstrument> = {
  args: {
    mode: 'clinician',
    heat: 'green',
    mttrSeconds: 180,
    mttrDelta: -10,
    mttrHistory: [300, 260, 220, 200, 180],
    transferStreak: 1,
    resistanceBadge: { count: 0 },
    proofBadge: { completed: 1, total: 3 },
    schema: 'S2 Defectiveness',
    family: 'F3 Reject Kindness',
    mindblock: 'MB-S2-F3-01',
    move: 'Name Pattern',
    stance: 'sage',
    receipts: [
      { key: 'r1', label: 'Pre/Post State', state: 'pending' },
      { key: 'r2', label: 'Voice Note', state: 'pending' }
    ],
    transfer: { key: 't1', label: 'Repeat in new context', state: 'pending' },
    safeStates: ['green', 'amber'],
    pillar: 'Cognitive Reframing',
    concept: 'Appraisal Flexibility',
    theme: 'Pattern Testing',
    audio: 'none',
    resistance: false,
    proofSubtitle: 'Proof starts with receipts.',
    isMobile: false,
    pinnedCTA: false,
    compressProof: false,
    companionProofChip: 'Proof 1/3'
  }
};
