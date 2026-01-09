import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { DataDignityBlock } from '../blocks/DataDignityBlock';
import { EscalationBlock } from '../blocks/EscalationBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, SimpleBlock, CtaContent } from './types';
import { GovernancePanel } from '../../components/CriticalRecoveryDeck';

export type TrustPageProps = {
  hero: HeroContent;
  dataDignity: SimpleBlock;
  escalation: SimpleBlock & { ctaLabel?: string; onCta?: () => void };
  cta: CtaContent;
};

export function TrustPage({ hero, dataDignity, escalation, cta }: TrustPageProps) {
  return (
    <div>
      <PageSection tone="overlay">
        <HeroBlock {...hero} />
      </PageSection>

      <PageSection>
        <GovernancePanel />
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

export default TrustPage;
