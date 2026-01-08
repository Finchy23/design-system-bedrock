import React from 'react';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';

export type ModuleShellProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctas?: React.ReactNode;
  children?: React.ReactNode;
  tone?: 'quiet' | 'brand' | 'clinical';
};

export default function ModuleShell({ eyebrow, title, body, ctas, children }: ModuleShellProps) {
  return (
    <Surface as="section" tone="base" padding="var(--space-4)">
      <Stack gap={2}>
        {eyebrow && <Text as="div" variant="eyebrow">{eyebrow}</Text>}
        {title && <Text as="h2" variant="h2">{title}</Text>}
        {body && <Text as="p" variant="body">{body}</Text>}
        {ctas && <div>{ctas}</div>}
        <div>{children}</div>
      </Stack>
    </Surface>
  );
}
