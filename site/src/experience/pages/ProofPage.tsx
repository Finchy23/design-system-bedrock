import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { ProofBlock } from '../blocks/ProofBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, ProofContent, CtaContent } from './types';

export type ProofPageProps = {
  hero: HeroContent;
  proof: ProofContent;
  cta: CtaContent;
};

export function ProofPage({ hero, proof, cta }: ProofPageProps) {
  return (
    <div>
      <PageSection tone="overlay">
        <HeroBlock {...hero} />
      </PageSection>

      <PageSection>
        <ProofBlock {...proof} />
      </PageSection>

      <PageSection>
        <CtaBand {...cta} />
      </PageSection>
    </div>
  );
}

export default ProofPage;
