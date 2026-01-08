import React from 'react';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import SiteHeader, { NavItem } from './SiteHeader';
import SiteFooter from './SiteFooter';

export type SiteLayoutProps = {
  nav: NavItem[];
  activeNav?: string;
  onNavigate?: (key: string) => void;
  children: React.ReactNode;
};

export function SiteLayout({ nav, activeNav, onNavigate, children }: SiteLayoutProps) {
  return (
    <Surface as="div" tone="base" padding="0" style={{ border: 'none', minHeight: '100vh', background: 'var(--color-bg-base)' }}>
      <SiteHeader nav={nav} activeKey={activeNav} onNavigate={onNavigate} />
      <main style={{ padding: 'var(--space-6) var(--space-5)', maxWidth: 1100, margin: '0 auto' }}>
        <Stack gap={6}>{children}</Stack>
      </main>
      <SiteFooter />
    </Surface>
  );
}

export default SiteLayout;
