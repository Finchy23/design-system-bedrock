import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { LoopExplainerBlock } from '../blocks/LoopExplainerBlock';
import { ProofBlock } from '../blocks/ProofBlock';
import { DataDignityBlock } from '../blocks/DataDignityBlock';
import { EscalationBlock } from '../blocks/EscalationBlock';
import { WorldSelectorBlock } from '../blocks/WorldSelectorBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, LoopContent, ProofContent, SimpleBlock, CtaContent, WorldSelectorContent } from './types';

export type HomePageProps = {
  hero: HeroContent;
  loop: LoopContent;
  proof: ProofContent;
  dataDignity: SimpleBlock;
  escalation: SimpleBlock & { ctaLabel?: string; onCta?: () => void };
  worldSelector: WorldSelectorContent;
  cta: CtaContent;
};

export function HomePage({ hero, loop, proof, dataDignity, escalation, worldSelector, cta }: HomePageProps) {
  return (
    <div>
      <PageSection tone="overlay">
        <HeroBlock {...hero} />
      </PageSection>

      <PageSection>
        <LoopExplainerBlock {...loop} />
      </PageSection>

      <PageSection>
        <ProofBlock {...proof} />
      </PageSection>

      <PageSection>
        <DataDignityBlock title={dataDignity.title} bullets={dataDignity.bullets} />
      </PageSection>

      <PageSection>
        <EscalationBlock title={escalation.title} body={escalation.subtitle} ctaLabel={escalation.ctaLabel} onCta={escalation.onCta} />
      </PageSection>

      <PageSection>
        <WorldSelectorBlock {...worldSelector} />
      </PageSection>

      <PageSection>
        <CtaBand {...cta} />
      </PageSection>
    </div>
  );
}

export default HomePage;
