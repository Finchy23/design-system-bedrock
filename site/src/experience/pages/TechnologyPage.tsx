import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { HeroBlock } from '../blocks/HeroBlock';
import { LoopExplainerBlock } from '../blocks/LoopExplainerBlock';
import { LumaVowBlock } from '../blocks/LumaVowBlock';
import { DataDignityBlock } from '../blocks/DataDignityBlock';
import { CtaBand } from '../blocks/CtaBand';
import { HeroContent, LoopContent, SimpleBlock, CtaContent } from './types';

export type TechnologyPageProps = {
  hero: HeroContent;
  loop: LoopContent;
  luma: SimpleBlock;
  dataDignity: SimpleBlock;
  cta: CtaContent;
};

export function TechnologyPage({ hero, loop, luma, dataDignity, cta }: TechnologyPageProps) {
  return (
    <div>
      <PageSection tone="overlay">
        <HeroBlock {...hero} />
      </PageSection>

      <PageSection>
        <LumaVowBlock title={luma.title} bullets={luma.bullets} />
      </PageSection>

      <PageSection>
        <DataDignityBlock title={dataDignity.title} bullets={dataDignity.bullets} />
      </PageSection>

      <PageSection>
        <LoopExplainerBlock {...loop} />
      </PageSection>

      <PageSection>
        <CtaBand {...cta} />
      </PageSection>
    </div>
  );
}

export default TechnologyPage;
