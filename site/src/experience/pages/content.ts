import { HeroContent, LoopContent, ProofContent, SimpleBlock, CtaContent, WorldSelectorContent } from './types';

export const homeContent = {
  hero: {
    title: 'Recovery — now runs in real life.',
    subtitle: 'A living layer that reads the moment, routes the right move, and proves it held.',
    primaryCta: { label: 'Choose your world' },
    secondaryCta: { label: 'See how it works', variant: 'secondary' }
  } satisfies HeroContent,
  loop: {
    title: 'READ → ROUTE → DELIVER → SEAL.',
    subtitle: 'State-first. Appropriate dose. Delivered in the right voice. Sealed with proof.'
  } satisfies LoopContent,
  proof: {
    stage: 'trajectory',
    title: 'Receipt → Transfer → Trajectory.',
    subtitle: 'North star: MTTR — Mean Time To Return. Return speed is the skill.'
  } satisfies ProofContent,
  dataDignity: {
    title: 'Quiet by default. Consent by design.',
    bullets: ['No urgency theatre or streak pressure.', 'Support feels like relief, not noise.']
  } satisfies SimpleBlock,
  escalation: {
    title: 'Humans when humans matter.',
    subtitle: 'When the loop doesn’t hold: change dose → change target → bring in a human → safety rails.',
    ctaLabel: 'Contact support'
  },
  worldSelector: {
    title: 'Choose your world',
    subtitle: 'Companion (Individual) · Console (Professional) · Command Center (Organisation)',
    cards: [
      { key: 'ind', title: 'Companion', body: 'Stay oriented. The moment layer that meets drift.', ctaLabel: 'Start with Companion' },
      { key: 'pro', title: 'Console', body: 'Your work — extended between sessions.', ctaLabel: 'Explore the Console' },
      { key: 'org', title: 'Command Center', body: 'Continuity you can defend.', ctaLabel: 'See the Command Center' }
    ]
  } satisfies WorldSelectorContent,
  cta: {
    title: 'Recovery — now runs in real life.',
    body: 'Built for timing. Proof without punishment. Humans when humans matter.',
    primaryLabel: 'Choose your world',
    secondaryLabel: 'See how it works'
  } satisfies CtaContent
};

export const howItWorksContent = {
  hero: {
    title: 'Built for timing.',
    subtitle: 'The right thing at the right time, in the right dose — with proof.',
    primaryCta: { label: 'See how it works' },
    secondaryCta: { label: 'Talk to us', variant: 'secondary' }
  } satisfies HeroContent,
  loop: {
    title: 'READ → ROUTE → DELIVER → SEAL.',
    subtitle: 'READ: state/readiness/resistance. ROUTE: target + dose. DELIVER: Journeys + NaviCues with LUMA. SEAL: Action → Receipt → Transfer → Trajectory; MTTR tracked.'
  } satisfies LoopContent,
  proof: {
    stage: 'trajectory',
    title: 'Proof as currency.',
    subtitle: 'Action → Receipt → Transfer → Trajectory. Proof without punishment; identity changes from evidence.'
  } satisfies ProofContent,
  luma: {
    title: 'LUMA — Orchestration you can trust.',
    bullets: ['State-first conduction with “why this, why now”.', 'Deterministic escalation when resistance persists.']
  } satisfies SimpleBlock,
  dataDignity: {
    title: 'Data dignity.',
    bullets: ['Quiet by default. Consent by design.', 'Proof is reinforcement, not ranking. Cadence and quiet hours respected.']
  } satisfies SimpleBlock,
  escalation: {
    title: 'Escalation.',
    subtitle: 'Change delivery → change target → invoke human → safety rails. Capacity-aware. Humans when humans matter.',
    ctaLabel: 'Contact support'
  },
  cta: {
    title: 'Recovery — now runs in real life.',
    body: 'Built for timing. Governed. Explainable. Measurable.',
    primaryLabel: 'Talk to us',
    secondaryLabel: 'See Proof'
  } satisfies CtaContent
};

export const proofContent = {
  hero: {
    title: 'Proof, without punishment.',
    subtitle: 'Receipts that reinforce return — until change holds.',
    primaryCta: { label: 'See Proof' },
    secondaryCta: { label: 'Talk to us', variant: 'secondary' }
  } satisfies HeroContent,
  proof: {
    stage: 'trajectory',
    title: 'Receipt → Transfer → Trajectory.',
    subtitle: 'Receipt: evidence the move happened. Transfer: evidence it held in life. Trajectory: evidence it’s becoming default.',
    bullets: ['North star: MTTR — return gets faster; baseline steadies.', 'When progress is visible, it becomes livable. Proof is reinforcement, not ranking.']
  } satisfies ProofContent,
  cta: {
    title: 'Recovery — now runs in real life.',
    body: 'Proof is the currency. MTTR is the gravity.',
    primaryLabel: 'See Proof',
    secondaryLabel: 'Talk to us'
  } satisfies CtaContent
};

export const technologyContent = {
  hero: {
    title: 'Built for timing.',
    subtitle: 'Innovation that feels simple — because it’s appropriate.',
    primaryCta: { label: 'See how it works' },
    secondaryCta: { label: 'Talk to us', variant: 'secondary' }
  } satisfies HeroContent,
  loop: {
    title: 'State-first computing.',
    subtitle: 'The system reads state before it speaks. State isn’t judgement; it’s routing.'
  } satisfies LoopContent,
  luma: {
    title: 'LUMA vow.',
    bullets: ['Governed intelligence inside the spine.', 'Why this, why now — in one line. Appropriate, not improvised.']
  } satisfies SimpleBlock,
  dataDignity: {
    title: 'Trust boundary.',
    bullets: ['Quiet by default. Consent by design.', 'Proof is reinforcement, not ranking. Humans when humans matter.']
  } satisfies SimpleBlock,
  cta: {
    title: 'Recovery — now runs in real life.',
    body: 'Built for timing. Governed. Explainable. Measurable.',
    primaryLabel: 'See how it works',
    secondaryLabel: 'Talk to us'
  } satisfies CtaContent
};

export const trustContent = {
  hero: {
    title: 'Trust, by design.',
    subtitle: 'Recovery only works when it feels safe enough to use in real moments.',
    primaryCta: { label: 'Read the vow' },
    secondaryCta: { label: 'Talk to us', variant: 'secondary' }
  } satisfies HeroContent,
  dataDignity: {
    title: 'Dignity is the foundation.',
    bullets: [
      'Quiet by default. No urgency theatre or streak pressure.',
      'Consent by design: purpose-bound sharing, quiet hours honored.',
      'Proof without punishment; receipts reinforce return, not rank humans.'
    ]
  } satisfies SimpleBlock,
  escalation: {
    title: 'Humans when humans matter.',
    subtitle: 'Escalation is built in: when the loop doesn’t hold, the system brings the right human at the right time.',
    ctaLabel: 'Contact support'
  },
  cta: {
    title: 'Recovery — now runs in real life.',
    body: 'Precision without pressure. Trust is the foundation.',
    primaryLabel: 'Talk to us'
  } satisfies CtaContent
};

export const chooseWorldContent = {
  hero: {
    title: 'Where do you run recovery?',
    subtitle: 'One OS. Three ways to run it.',
    primaryCta: { label: 'Choose your world' }
  } satisfies HeroContent,
  selector: {
    title: 'Choose your world',
    cards: [
      { key: 'ind', title: 'Individual — Companion', body: 'Stay oriented. Cue → Move → Receipt. Return history (MTTR). Support Graph with consent.', ctaLabel: 'Start with Companion' },
      { key: 'pro', title: 'Professionals — Console', body: 'Your work — extended. Signal: what held, what slipped, return speed. Mindblock Studio, Contract Compiler, Escalation queue.', ctaLabel: 'Explore the Console' },
      { key: 'org', title: 'Organisations — Command Center', body: 'Continuity — built in. Cohort MTTR curves, Transfer verification, Integrity logs, Escalation load.', ctaLabel: 'See the Command Center' }
    ]
  } satisfies WorldSelectorContent,
  proof: {
    stage: 'trajectory',
    title: 'Proof without punishment.',
    subtitle: 'Recovery — now runs in real life. Built for timing. Proof without punishment. Humans when humans matter.'
  } satisfies ProofContent,
  cta: {
    title: 'Choose your world.',
    primaryLabel: 'Choose your world',
    secondaryLabel: 'Talk to us'
  } satisfies CtaContent
};

export const individualContent = {
  hero: {
    title: 'Stay oriented.',
    subtitle: 'A quiet layer that meets you at the moment of drift — and guides the return.',
    primaryCta: { label: 'Start with Companion' }
  } satisfies HeroContent,
  loop: {
    title: 'Cue → Move → Receipt.',
    subtitle: 'A quick return? 30 seconds. One move. Seal with a receipt.'
  } satisfies LoopContent,
  proof: {
    stage: 'trajectory',
    title: 'Return history (MTTR).',
    subtitle: 'Return is the skill. Return gets faster; baseline steadies. Proof without punishment.'
  } satisfies ProofContent,
  dataDignity: {
    title: 'Data dignity.',
    bullets: ['Quiet by default. Consent by design.', 'Proof is reinforcement, not ranking.']
  } satisfies SimpleBlock,
  escalation: {
    title: 'Support Graph.',
    subtitle: 'Your people, with purpose and consent. Roles: Witness, Peer, Safety, Clinician. Visibility you control.',
    ctaLabel: 'Manage support'
  },
  cta: {
    title: 'Recovery — now runs in real life.',
    body: 'One move. One receipt. Return becomes default.',
    primaryLabel: 'Start with Companion'
  } satisfies CtaContent
};

export const professionalsContent = {
  hero: {
    title: 'Your work — extended.',
    subtitle: 'Continuity that carries your standard between sessions — so your impact compounds.',
    primaryCta: { label: 'Explore the Console' }
  } satisfies HeroContent,
  loop: {
    title: 'Signal, not noise.',
    subtitle: 'What held. What slipped. Return speed (MTTR). No reconstruction. No engagement theatre.'
  } satisfies LoopContent,
  proof: {
    stage: 'transfer',
    title: 'Mindblock Studio + Contract Compiler.',
    subtitle: 'Atomic endpoints with governed delivery: target + primitive + proof + transfer. No move ships without a contract.'
  } satisfies ProofContent,
  dataDignity: {
    title: 'Data dignity.',
    bullets: ['Quiet by default. Proof without punishment.', 'Clinically legible, human in tone.']
  } satisfies SimpleBlock,
  escalation: {
    title: 'Escalation queue (ρ).',
    subtitle: 'Resistance is routing data. Deterministic escalation: change delivery → change target → bring in a human → safety rails.',
    ctaLabel: 'Review escalations'
  },
  cta: {
    title: 'Recovery — now runs in real life.',
    body: 'Your standard holds. Your time returns. Your impact compounds.',
    primaryLabel: 'Explore the Console'
  } satisfies CtaContent
};

export const organisationsContent = {
  hero: {
    title: 'Continuity — built in.',
    subtitle: 'Closed-loop recovery infrastructure that makes outcomes legible and defensible.',
    primaryCta: { label: 'See the Command Center' }
  } satisfies HeroContent,
  loop: {
    title: 'Discharge is a handoff, not an ending.',
    subtitle: 'Continuity can’t be optional. The loop holds outside the building.'
  } satisfies LoopContent,
  proof: {
    stage: 'trajectory',
    title: 'Outcomes that stand up.',
    subtitle: 'Cohort MTTR curves. Transfer verification. Defensibility you can present.'
  } satisfies ProofContent,
  dataDignity: {
    title: 'Evidence product.',
    bullets: ['Accreditation mapping. Payer-ready exports. Integrity logs.', 'Proof without theatre.']
  } satisfies SimpleBlock,
  escalation: {
    title: 'Capacity and escalation load.',
    subtitle: 'Human load visible and governable. Deterministic escalation protects clinicians and clients.',
    ctaLabel: 'View escalation load'
  },
  cta: {
    title: 'Recovery — now runs in real life.',
    body: 'Scale with integrity. Outcomes you can defend.',
    primaryLabel: 'See the Command Center'
  } satisfies CtaContent
};
