import React from 'react';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';

type Props = {
  path: string[];
  activeModuleTitle?: string;
};

export default function ChatVisualization({ path, activeModuleTitle }: Props) {
  return (
    <Surface tone="raised" padding="var(--space-4)">
      <Stack gap={2}>
        <Text as="div" variant="meta">Path</Text>
        <Stack gap={1}>
          {path.map((p) => (
            <Text key={p} as="div" variant="body" tone="muted">{p}</Text>
          ))}
        </Stack>
        {activeModuleTitle && (
          <Text as="div" variant="body">Currently viewing: {activeModuleTitle}</Text>
        )}
      </Stack>
    </Surface>
  );
}
