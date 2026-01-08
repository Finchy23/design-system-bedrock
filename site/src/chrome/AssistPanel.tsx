import React from 'react';
import { Surface } from '../primitives/Surface';
import { Text } from '../primitives/Text';
import { Stack } from '../primitives/Stack';

type Mode = 'navigate' | 'qualify' | 'answer';

interface AssistPanelProps {
  mode?: Mode;
}

export default function AssistPanel({ mode = 'navigate' }: AssistPanelProps) {
  return (
    <Surface as="aside" tone="overlay" padding="var(--space-3)">
      <Stack gap={2}>
        <Text as="div" variant="meta" tone="primary">Assist · {mode}</Text>
        {mode === 'navigate' && <Text as="div" variant="body">Quick navigation and recent items.</Text>}
        {mode === 'qualify' && <Text as="div" variant="body">Qualification UI: short forms and signals.</Text>}
        {mode === 'answer' && <Text as="div" variant="body">Answer UI: final steps and CTAs.</Text>}
      </Stack>
    </Surface>
  );
}
