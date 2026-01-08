import React from 'react';
import { Surface } from '../primitives/Surface';
import { Text } from '../primitives/Text';

export default function InspectorPanel() {
  return (
    <Surface as="aside" tone="base" style={{ width: 320, borderLeft: '1px solid var(--color-border-default)', padding: 'var(--space-4)', background: 'var(--color-bg-surface)' }}>
      <Text as="h4" variant="h3">Inspector</Text>
      <Text as="div" variant="body">Contextual controls and details appear here.</Text>
    </Surface>
  );
}
