import React from 'react';
import { Stack } from '../primitives/Stack';
import { Surface } from '../primitives/Surface';
import { Text } from '../primitives/Text';

export default function LeftRail() {
  return (
    <Surface as="aside" tone="base" style={{ width: 88, borderRight: '1px solid var(--color-border-default)', padding: 'var(--space-3)' }}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <Surface as="div" style={{ width: 40, height: 40, background: 'var(--color-brand-primary)' }} />
      </div>
      <nav>
        <Stack as="ul" gap={3} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <Text as="li" variant="body">Home</Text>
          <Text as="li" variant="body">Journey</Text>
          <Text as="li" variant="body">Proof</Text>
        </Stack>
      </nav>
    </Surface>
  );
}
