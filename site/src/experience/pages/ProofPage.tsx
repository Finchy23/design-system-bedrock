import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, CtaContent } from './types';
import { CriticalRecoveryDeck } from '../../components/CriticalRecoveryDeck';

export type ProofPageProps = {
  hero: HeroContent;
  cta: CtaContent;
};

export function ProofPage({ hero, cta }: ProofPageProps) {
  return (
    <div>
      <PageSection tone="overlay">
        <HeroBlock {...hero} />
      </PageSection>

      <PageSection>
        <CriticalRecoveryDeck />
      </PageSection>

      <PageSection>
        <CtaBand {...cta} />
      </PageSection>
    </div>
  );
}

export default ProofPage;
