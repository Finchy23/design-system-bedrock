import React from 'react';
import LeftRail from './LeftRail';
import Stage from './Stage';
import InspectorPanel from './InspectorPanel';
import { Surface } from '../primitives/Surface';

interface EngineShellProps {
  children?: React.ReactNode;
}

export default function EngineShell({ children }: EngineShellProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg-base)' }}>
      <LeftRail />
      <main style={{ flex: 1, padding: 'var(--space-4)' }}>
        <Surface as="div" tone="base" style={{ minHeight: '100vh' }}>
          <Stage>{children}</Stage>
        </Surface>
      </main>
      <InspectorPanel />
    </div>
  );
}
