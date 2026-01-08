import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { LoopExplainerBlock } from '../blocks/LoopExplainerBlock';
import { ProofBlock } from '../blocks/ProofBlock';
import { DataDignityBlock } from '../blocks/DataDignityBlock';
import { EscalationBlock } from '../blocks/EscalationBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, LoopContent, ProofContent, SimpleBlock, CtaContent } from './types';

export type WorldPageProps = {
  hero: HeroContent;
  loop: LoopContent;
  proof: ProofContent;
  dataDignity?: SimpleBlock;
  escalation?: SimpleBlock & { ctaLabel?: string; onCta?: () => void };
  cta: CtaContent;
};

export function WorldPage({ hero, loop, proof, dataDignity, escalation, cta }: WorldPageProps) {
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

      {dataDignity && (
        <PageSection>
          <DataDignityBlock title={dataDignity.title} bullets={dataDignity.bullets} />
        </PageSection>
      )}

      {escalation && (
        <PageSection>
          <EscalationBlock title={escalation.title} body={escalation.subtitle} ctaLabel={escalation.ctaLabel} onCta={escalation.onCta} />
        </PageSection>
      )}

      <PageSection>
        <CtaBand {...cta} />
      </PageSection>
    </div>
  );
}

export default WorldPage;
