import React from 'react';
import Surface from '../../primitives/Surface';
import { Stack } from '../../primitives/Stack';

export type PageSectionProps = {
  tone?: 'base' | 'raised' | 'overlay';
  padding?: string;
  maxWidth?: number;
  children: React.ReactNode;
  glass?: boolean;
};

export function PageSection({
  tone = 'base',
  padding = 'var(--layout-section-padding)',
  maxWidth = 1200,
  glass = false,
  children
}: PageSectionProps) {
  return (
    <Surface tone={tone} padding={padding} glass={glass} style={{ display: 'flex', justifyContent: 'center' }}>
      <Stack gap={4} style={{ width: '100%', maxWidth: maxWidth, margin: '0 auto' }}>
        {children}
      </Stack>
    </Surface>
  );
}

export default PageSection;
