import React from 'react';
import SiteLayout from './layout/SiteLayout';
import { HowItWorksPage } from './experience/pages/HowItWorksPage';
import { ProofPage } from './experience/pages/ProofPage';
import { TechnologyPage } from './experience/pages/TechnologyPage';
import { TrustPage } from './experience/pages/TrustPage';
import { ChooseWorldPage } from './experience/pages/ChooseWorldPage';
import { WorldPage } from './experience/pages/WorldPage';
import { RecoveryDocPage } from './experience/pages/RecoveryDocPage';
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
} from './experience/pages/content';
import { usePageMeta } from './seo/usePageMeta';

export type RouteKey =
  | 'home'
  | 'how'
  | 'proof'
  | 'tech'
  | 'trust'
  | 'choose'
  | 'world-ind'
  | 'world-pro'
  | 'world-org';

const navItems = [
  { key: 'home', label: 'Home' },
  { key: 'how', label: 'How it works' },
  { key: 'proof', label: 'Proof' },
  { key: 'tech', label: 'Technology' },
  { key: 'trust', label: 'Trust' },
  { key: 'choose', label: 'Choose world' }
];

const routeConfig: Record<RouteKey, { render: () => JSX.Element; meta: { title: string; description: string } }> = {
  home: {
    render: () => (
      <RecoveryDocPage />
    ),
    meta: { title: 'Recovery OS — Home', description: homeContent.hero.subtitle }
  },
  how: {
    render: () => (
      <HowItWorksPage
        hero={howItWorksContent.hero}
        cta={howItWorksContent.cta}
      />
    ),
    meta: { title: 'Recovery OS — How it works', description: howItWorksContent.hero.subtitle }
  },
  proof: {
    render: () => <ProofPage hero={proofContent.hero} cta={proofContent.cta} />,
    meta: { title: 'Recovery OS — Proof', description: proofContent.hero.subtitle }
  },
  tech: {
    render: () => (
      <TechnologyPage
        hero={technologyContent.hero}
        cta={technologyContent.cta}
      />
    ),
    meta: { title: 'Recovery OS — Technology', description: technologyContent.hero.subtitle }
  },
  trust: {
    render: () => (
      <TrustPage
        hero={trustContent.hero}
        dataDignity={trustContent.dataDignity}
        escalation={trustContent.escalation}
        cta={trustContent.cta}
      />
    ),
    meta: { title: 'Recovery OS — Trust', description: trustContent.hero.subtitle }
  },
  choose: {
    render: () => (
      <ChooseWorldPage
        hero={chooseWorldContent.hero}
        proof={chooseWorldContent.proof}
        selector={chooseWorldContent.selector}
        cta={chooseWorldContent.cta}
      />
    ),
    meta: { title: 'Recovery OS — Choose your world', description: chooseWorldContent.hero.subtitle }
  },
  'world-ind': {
    render: () => (
      <WorldPage
        hero={individualContent.hero}
        loop={individualContent.loop}
        proof={individualContent.proof}
        dataDignity={individualContent.dataDignity}
        escalation={individualContent.escalation}
        cta={individualContent.cta}
      />
    ),
    meta: { title: 'Recovery OS — Companion', description: individualContent.hero.subtitle }
  },
  'world-pro': {
    render: () => (
      <WorldPage
        hero={professionalsContent.hero}
        loop={professionalsContent.loop}
        proof={professionalsContent.proof}
        dataDignity={professionalsContent.dataDignity}
        escalation={professionalsContent.escalation}
        cta={professionalsContent.cta}
      />
    ),
    meta: { title: 'Recovery OS — Console', description: professionalsContent.hero.subtitle }
  },
  'world-org': {
    render: () => (
      <WorldPage
        hero={organisationsContent.hero}
        loop={organisationsContent.loop}
        proof={organisationsContent.proof}
        dataDignity={organisationsContent.dataDignity}
        escalation={organisationsContent.escalation}
        cta={organisationsContent.cta}
      />
    ),
    meta: { title: 'Recovery OS — Command Center', description: organisationsContent.hero.subtitle }
  }
};

export type AppProps = {
  route?: RouteKey;
  onNavigate?: (route: RouteKey) => void;
};

export function App({ route = 'home', onNavigate }: AppProps) {
  const page = routeConfig[route] ?? routeConfig.home;
  usePageMeta(page.meta);

  return (
    <SiteLayout
      nav={navItems}
      activeNav={route}
      onNavigate={(key) => {
        const mapped = key as RouteKey;
        onNavigate?.(mapped);
      }}
    >
      {page.render()}
    </SiteLayout>
  );
}

export default App;
