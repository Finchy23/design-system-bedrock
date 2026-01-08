import React from 'react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import { Button } from '../../primitives/Button';
import Icon from '../../primitives/Icon';

export type EscalationBlockProps = {
  title?: string;
  body?: string;
  ctaLabel?: string;
  onCta?: () => void;
};

export function EscalationBlock({
  title = 'Humans when humans matter.',
  body = 'When the loop is not holding, we escalate cleanly — change dose, change target, bring in a human.',
  ctaLabel = 'Contact support',
  onCta
}: EscalationBlockProps) {
  return (
    <Stack gap={2} className="fade-up">
      <Stack gap={1} inline align="center">
        <Icon name="phone" size={16} color="var(--color-brand-primary)" />
        <Text variant="h3">{title}</Text>
      </Stack>
      <Text variant="body" tone="muted">{body}</Text>
      <Button variant="primary" onClick={onCta}>{ctaLabel}</Button>
    </Stack>
  );
}

export default EscalationBlock;
