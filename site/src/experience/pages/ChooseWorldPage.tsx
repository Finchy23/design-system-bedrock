import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { ProofBlock } from '../blocks/ProofBlock';
import { WorldSelectorBlock } from '../blocks/WorldSelectorBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, ProofContent, CtaContent, WorldSelectorContent } from './types';

export type ChooseWorldPageProps = {
  hero: HeroContent;
  proof: ProofContent;
  selector: WorldSelectorContent;
  cta: CtaContent;
};

export function ChooseWorldPage({ hero, proof, selector, cta }: ChooseWorldPageProps) {
  return (
    <div>
      <PageSection tone="overlay">
        <HeroBlock {...hero} />
      </PageSection>

      <PageSection>
        <WorldSelectorBlock {...selector} />
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

export default ChooseWorldPage;
