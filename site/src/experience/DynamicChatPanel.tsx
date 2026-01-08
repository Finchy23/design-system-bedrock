import React from 'react';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';
import { DiscoveryModule, suggestedModules } from './discoveryData';

type Props = {
  categoryId?: string;
  onSelectModule: (id: string) => void;
};

export default function DynamicChatPanel({ categoryId, onSelectModule }: Props) {
  const recs = suggestedModules(categoryId);
  return (
    <Surface tone="overlay" padding="var(--space-4)">
      <Stack gap={3}>
        <Text as="div" variant="meta">Suggestions</Text>
        <Stack gap={2}>
          {recs.map((m: DiscoveryModule) => (
            <Surface key={m.id} tone="base" padding="var(--space-3)">
              <Stack gap={1}>
                <Text as="div" variant="h3">{m.title}</Text>
                <Text as="div" variant="body" tone="muted">{m.body}</Text>
                <Button variant="secondary" onClick={() => onSelectModule(m.id)}>Open</Button>
              </Stack>
            </Surface>
          ))}
        </Stack>
      </Stack>
    </Surface>
  );
}
