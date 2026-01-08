import React from 'react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import Icon from '../../primitives/Icon';

export type DataDignityBlockProps = {
  title?: string;
  bullets?: string[];
};

export function DataDignityBlock({
  title = 'Data dignity — quiet by default.',
  bullets = [
    'Consent by design; auditable delivery.',
    'No dashboards that punish; proof without pressure.',
    'Cadence rules and escalation built in.'
  ]
}: DataDignityBlockProps) {
  return (
    <Stack gap={2} className="fade-up">
      <Stack gap={1} inline align="center">
        <Icon name="lock" size={16} color="var(--color-brand-primary)" />
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

export default DataDignityBlock;
