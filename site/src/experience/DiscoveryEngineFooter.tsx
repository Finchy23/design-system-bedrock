import React from 'react';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';

type Props = {
  onPrimary: () => void;
  onSecondary?: () => void;
};

export default function DiscoveryEngineFooter({ onPrimary, onSecondary }: Props) {
  return (
    <Surface tone="base" padding="var(--space-4)">
      <Stack gap={2}>
        <Text as="div" variant="h3">Ready to move?</Text>
        <Text as="div" variant="body" tone="muted">Commit now or explore one more module.</Text>
        <Stack gap={2} inline align="center">
          <Button variant="primary" onClick={onPrimary}>Start signup</Button>
          {onSecondary && <Button variant="secondary" onClick={onSecondary}>One more look</Button>}
        </Stack>
      </Stack>
    </Surface>
  );
}
