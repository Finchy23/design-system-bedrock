import React from 'react';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';

export function SiteFooter() {
  return (
    <Surface as="footer" tone="overlay" padding="var(--space-4) var(--space-5)" style={{ borderRadius: 0 }}>
      <Stack gap={2}>
        <Stack inline align="center" gap={2}>
          <Surface as="div" tone="raised" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-brand-primary)', border: 'none' }} />
          <Text as="span" variant="body">Recovery OS</Text>
        </Stack>
        <Stack inline align="center" gap={3}>
          <Text variant="small" tone="muted">MTTR-first. Proof without punishment. Humans when humans matter.</Text>
        </Stack>
        <Stack inline align="center" gap={3}>
          <Button variant="tertiary"><Text variant="small" tone="muted">Privacy</Text></Button>
          <Button variant="tertiary"><Text variant="small" tone="muted">Status</Text></Button>
          <Button variant="tertiary"><Text variant="small" tone="muted">Contact</Text></Button>
        </Stack>
      </Stack>
    </Surface>
  );
}

export default SiteFooter;
