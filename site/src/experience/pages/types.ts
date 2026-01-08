import { HeroCta } from '../blocks/HeroBlock';
import { LoopStep } from '../blocks/LoopExplainerBlock';
import { WorldCard } from '../blocks/WorldSelectorBlock';

export type HeroContent = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  kicker?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
};

export type LoopContent = {
  title?: string;
  subtitle?: string;
  steps?: LoopStep[];
};

export type ProofContent = {
  stage?: 'receipt' | 'transfer' | 'trajectory';
  title?: string;
  subtitle?: string;
  bullets?: string[];
};

export type SimpleBlock = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
};

export type CtaContent = {
  title: string;
  body?: string;
  primaryLabel: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

export type WorldSelectorContent = {
  title?: string;
  subtitle?: string;
  cards: WorldCard[];
};
