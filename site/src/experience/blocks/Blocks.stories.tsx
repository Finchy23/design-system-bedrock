import type { Meta, StoryObj } from '@storybook/react';
import { PageSection } from './PageSection';
import { HeroBlock } from './HeroBlock';
import { LoopExplainerBlock } from './LoopExplainerBlock';
import { ProofBlock } from './ProofBlock';
import { LumaVowBlock } from './LumaVowBlock';
import { DataDignityBlock } from './DataDignityBlock';
import { EscalationBlock } from './EscalationBlock';
import { CtaBand } from './CtaBand';
import { WorldSelectorBlock } from './WorldSelectorBlock';

const meta: Meta = {
  title: 'Blocks/All',
};

export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageSection tone="overlay">
        <HeroBlock
          eyebrow="Recovery — now runs in real life."
          title="Built for timing."
          subtitle="The system that reads state, routes the right dose, delivers the move, and seals it with proof."
          primaryCta={{ label: 'Choose your world' }}
          secondaryCta={{ label: 'See how it works', variant: 'secondary' }}
        />
      </PageSection>

      <PageSection>
        <LoopExplainerBlock subtitle="Four verbs. One closed loop." />
      </PageSection>

      <PageSection>
        <ProofBlock stage="transfer" subtitle="Receipt → Transfer → Trajectory" bullets={["Return gets faster (MTTR)", "Proof without punishment"]} />
      </PageSection>

      <PageSection>
        <LumaVowBlock />
      </PageSection>

      <PageSection>
        <DataDignityBlock />
      </PageSection>

      <PageSection>
        <EscalationBlock />
      </PageSection>

      <PageSection>
        <WorldSelectorBlock
          cards={[
            { key: 'ind', title: 'Individuals', body: 'Stay oriented. The moment layer.', ctaLabel: 'Start with Companion' },
            { key: 'pro', title: 'Professionals', body: 'Your work — extended between sessions.', ctaLabel: 'Explore the Console' },
            { key: 'org', title: 'Organisations', body: 'Continuity you can defend.', ctaLabel: 'See the Command Center' }
          ]}
        />
      </PageSection>

      <PageSection>
        <CtaBand title="Ready to roll?" primaryLabel="Choose your world" secondaryLabel="Talk to us" />
      </PageSection>
    </div>
  )
};
