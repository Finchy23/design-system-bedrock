import React from 'react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import { Button } from '../../primitives/Button';

export type CtaBandProps = {
  title: string;
  body?: string;
  primaryLabel: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

export function CtaBand({ title, body, primaryLabel, onPrimary, secondaryLabel, onSecondary }: CtaBandProps) {
  return (
    <Stack gap={2} style={{ alignItems: 'flex-start' }} className="fade-up">
      <Text variant="h3" className="underline-flow">{title}</Text>
      {body && <Text variant="body" tone="muted">{body}</Text>}
      <Stack gap={2} inline align="center" style={{ flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={onPrimary}>{primaryLabel}</Button>
        {secondaryLabel && <Button variant="secondary" onClick={onSecondary}>{secondaryLabel}</Button>}
      </Stack>
    </Stack>
  );
}

export default CtaBand;
