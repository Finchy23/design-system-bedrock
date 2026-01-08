import React from 'react';
import { Stack } from '../primitives/Stack';

interface StageProps {
  children?: React.ReactNode;
}

export default function Stage({ children }: StageProps) {
  return (
    <section style={{ maxWidth: 980, margin: '0 auto' }}>
      <Stack gap={6}>{children}</Stack>
    </section>
  );
}
