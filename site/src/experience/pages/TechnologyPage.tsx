import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, CtaContent } from './types';
import { RecoveryContinuityShowcase } from '../../components/ContinuityEngineBlocks';
import { FoundationDeck } from '../../components/FoundationBlocks';
import { CriticalRecoveryDeck } from '../../components/CriticalRecoveryDeck';

export type TechnologyPageProps = {
  hero: HeroContent;
  cta: CtaContent;
};

export function TechnologyPage({ hero, cta }: TechnologyPageProps) {
  return (
    <div>
      <PageSection tone="overlay">
        <HeroBlock {...hero} />
      </PageSection>

      <PageSection>
        <RecoveryContinuityShowcase />
      </PageSection>

      <PageSection>
        <FoundationDeck />
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

export default TechnologyPage;
