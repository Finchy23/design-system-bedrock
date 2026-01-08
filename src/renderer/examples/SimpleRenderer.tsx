import React from 'react';
import { registerRenderer } from '../registry';
import { ModuleMetadata, RendererProps } from '../types';
import { canRender } from '../heatGate';

const meta: ModuleMetadata = {
  id: 'simple.renderer',
  title: 'Simple Example Renderer',
  intent: 'qualify',
  signals: ['started', 'completed'],
  primaryCTA: 'continue',
  heatGate: { red: false, amber: true, green: true },
  proofAsk: false
};

const SimpleRenderer: React.FC<RendererProps> = ({ heat, context }) => {
  if (!canRender(meta, heat)) {
    // minimal micro-UI when not allowed to show full renderer
    return <div aria-hidden style={{ padding: 8 }}>Action not available at this time</div>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>{meta.title}</h3>
      <p>Renderer running at heat: {heat}</p>
      <button onClick={() => console.log('signal', 'started')}>Start</button>
    </div>
  );
};

// auto-register when module is imported
registerRenderer(meta, SimpleRenderer);

export default SimpleRenderer;
