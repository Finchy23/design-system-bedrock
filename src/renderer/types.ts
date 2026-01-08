import React from 'react';

export type HeatLevel = 'red' | 'amber' | 'green';

export interface ModuleMetadata {
  id: string;
  title?: string;
  intent: 'belief' | 'friction' | 'qualify' | 'commit';
  signals?: string[];
  primaryCTA?: string;
  // heatGate defines which heat levels this module is allowed to run in
  heatGate: {
    red?: boolean;
    amber?: boolean;
    green?: boolean;
  };
  proofAsk?: boolean;
}

export type RendererProps = {
  heat: HeatLevel;
  context?: any;
};

export type RendererComponent = React.FC<RendererProps>;

export interface RegisteredRenderer {
  meta: ModuleMetadata;
  component: RendererComponent;
}
