import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { LoopExplainerBlock } from '../blocks/LoopExplainerBlock';
import { ProofBlock } from '../blocks/ProofBlock';
import { LumaVowBlock } from '../blocks/LumaVowBlock';
import { DataDignityBlock } from '../blocks/DataDignityBlock';
import { EscalationBlock } from '../blocks/EscalationBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, LoopContent, ProofContent, SimpleBlock, CtaContent } from './types';

export type HowItWorksPageProps = {
  hero: HeroContent;
  loop: LoopContent;
  proof: ProofContent;
  luma: SimpleBlock;
  dataDignity: SimpleBlock;
  escalation: SimpleBlock & { ctaLabel?: string; onCta?: () => void };
  cta: CtaContent;
};

export function HowItWorksPage({ hero, loop, proof, luma, dataDignity, escalation, cta }: HowItWorksPageProps) {
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
        <LumaVowBlock title={luma.title} bullets={luma.bullets} />
      </PageSection>

      <PageSection>
        <DataDignityBlock title={dataDignity.title} bullets={dataDignity.bullets} />
      </PageSection>

      <PageSection>
        <EscalationBlock title={escalation.title} body={escalation.subtitle} ctaLabel={escalation.ctaLabel} onCta={escalation.onCta} />
      </PageSection>

      <PageSection>
        <CtaBand {...cta} />
      </PageSection>
    </div>
  );
}

export default HowItWorksPage;
