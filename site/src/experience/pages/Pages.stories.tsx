import type { Meta, StoryObj } from '@storybook/react';
import { HomePage, HowItWorksPage, ProofPage, TechnologyPage, TrustPage, ChooseWorldPage, WorldPage } from './index';
import SiteLayout from '../../layout/SiteLayout';
import {
  homeContent,
  howItWorksContent,
  proofContent,
  technologyContent,
  trustContent,
  chooseWorldContent,
  individualContent,
  professionalsContent,
  organisationsContent
} from './content';

const navItems = [
  { key: 'home', label: 'Home' },
  { key: 'how', label: 'How it works' },
  { key: 'proof', label: 'Proof' },
  { key: 'tech', label: 'Technology' },
  { key: 'trust', label: 'Trust' },
  { key: 'choose', label: 'Choose world' }
];

const meta: Meta = {
  title: 'Pages/Showcase',
  decorators: [
    (Story) => (
      <SiteLayout nav={navItems} activeNav={navItems[0].key}>
        <Story />
      </SiteLayout>
    )
  ]
};

export default meta;

type Story = StoryObj;

export const Home: Story = {
  render: () => (
    <HomePage
      hero={homeContent.hero}
      loop={homeContent.loop}
      proof={homeContent.proof}
      dataDignity={homeContent.dataDignity}
      escalation={homeContent.escalation}
      worldSelector={homeContent.worldSelector}
      cta={homeContent.cta}
    />
  )
};

export const HowItWorks: Story = {
  render: () => (
    <HowItWorksPage
      hero={howItWorksContent.hero}
      loop={howItWorksContent.loop}
      proof={howItWorksContent.proof}
      luma={howItWorksContent.luma}
      dataDignity={howItWorksContent.dataDignity}
      escalation={howItWorksContent.escalation}
      cta={howItWorksContent.cta}
    />
  )
};

export const Proof: Story = {
  render: () => (
    <ProofPage hero={proofContent.hero} proof={proofContent.proof} cta={proofContent.cta} />
  )
};

export const Technology: Story = {
  render: () => (
    <TechnologyPage
      hero={technologyContent.hero}
      loop={technologyContent.loop}
      luma={technologyContent.luma}
      dataDignity={technologyContent.dataDignity}
      cta={technologyContent.cta}
    />
  )
};

export const Trust: Story = {
  render: () => (
    <TrustPage hero={trustContent.hero} dataDignity={trustContent.dataDignity} escalation={trustContent.escalation} cta={trustContent.cta} />
  )
};

export const ChooseWorld: Story = {
  render: () => (
    <ChooseWorldPage hero={chooseWorldContent.hero} proof={chooseWorldContent.proof} selector={chooseWorldContent.selector} cta={chooseWorldContent.cta} />
  )
};

export const World: Story = {
  render: () => (
    <WorldPage hero={individualContent.hero} loop={individualContent.loop} proof={individualContent.proof} dataDignity={individualContent.dataDignity} escalation={individualContent.escalation} cta={individualContent.cta} />
  )
};
