import React from 'react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import Icon from '../../primitives/Icon';

export type LumaVowBlockProps = {
  title?: string;
  bullets?: string[];
};

export function LumaVowBlock({
  title = 'LUMA — Orchestration you can trust.',
  bullets = [
    'Routes by state, consent, taxonomy, proof history.',
    'Explains choices — "why this, why now."',
    'Escalates when resistance persists; humans are not optional.'
  ]
}: LumaVowBlockProps) {
  return (
    <Stack gap={2}>
      <Stack gap={1} inline align="center">
        <Icon name="shield" size={16} color="var(--color-brand-primary)" />
        <Text variant="h3">{title}</Text>
      </Stack>
      <Stack gap={1}>
        {bullets.map((b, idx) => (
          <Text key={idx} variant="body" tone="muted">• {b}</Text>
        ))}
      </Stack>
    </Stack>
  );
}

export default LumaVowBlock;
