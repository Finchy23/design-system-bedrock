import React from 'react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import { Button } from '../../primitives/Button';
import Surface from '../../primitives/Surface';

export type WorldCard = {
  key: string;
  title: string;
  body: string;
  ctaLabel: string;
  onSelect?: () => void;
};

export type WorldSelectorBlockProps = {
  title?: string;
  subtitle?: string;
  cards: WorldCard[];
};

export function WorldSelectorBlock({
  title = 'Choose your world',
  subtitle,
  cards
}: WorldSelectorBlockProps) {
  return (
    <Stack gap={3} className="fade-up">
      <Text variant="h3">{title}</Text>
      {subtitle && <Text variant="body" tone="muted">{subtitle}</Text>}
      <Stack gap={3} inline style={{ flexWrap: 'wrap' }}>
        {cards.map((card) => (
          <Surface key={card.key} tone="raised" padding="var(--space-4)" style={{ width: 320 }} className="card-hover">
            <Stack gap={2}>
              <Text variant="h3">{card.title}</Text>
              <Text variant="body" tone="muted">{card.body}</Text>
              <Button variant="secondary" onClick={card.onSelect}>{card.ctaLabel}</Button>
            </Stack>
          </Surface>
        ))}
      </Stack>
    </Stack>
  );
}

export default WorldSelectorBlock;
