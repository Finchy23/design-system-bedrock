import React from 'react';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';

export type NavItem = {
  key: string;
  label: string;
};

export type SiteHeaderProps = {
  nav: NavItem[];
  activeKey?: string;
  onNavigate?: (key: string) => void;
};

export function SiteHeader({ nav, activeKey, onNavigate }: SiteHeaderProps) {
  return (
    <Surface as="header" tone="overlay" padding="var(--space-3) var(--space-5)" style={{ border: 'none', borderRadius: 0, position: 'sticky', top: 0, zIndex: 10 }}>
      <Stack inline align="center" gap={5} style={{ justifyContent: 'space-between', width: '100%' }}>
        <Stack inline align="center" gap={2}>
          <Surface as="div" tone="raised" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-brand-primary)', border: 'none' }} />
          <Text as="span" variant="h3">Recovery OS</Text>
        </Stack>
        <Stack inline align="center" gap={4}>
          {nav.map(item => (
            <Button
              key={item.key}
              variant={activeKey === item.key ? 'primary' : 'tertiary'}
              onClick={() => onNavigate?.(item.key)}
              style={{ padding: '6px 10px' }}
            >
              <Text as="span" variant="body" tone={activeKey === item.key ? 'primary' : 'muted'}>{item.label}</Text>
            </Button>
          ))}
          <Button variant="secondary" onClick={() => onNavigate?.('trust')}>
            <Text as="span" variant="body">Contact</Text>
          </Button>
        </Stack>
      </Stack>
    </Surface>
  );
}

export default SiteHeader;
