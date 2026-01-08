import { HeatLevel, ModuleMetadata } from './types';

export function canRender(meta: ModuleMetadata, currentHeat: HeatLevel): boolean {
  if (!meta || !meta.heatGate) return true;
  const gate = meta.heatGate;
  switch (currentHeat) {
    case 'red':
      return gate.red !== false; // allow unless explicitly false
    case 'amber':
      return gate.amber !== false;
    case 'green':
      return gate.green !== false;
    default:
      return true;
  }
}

export function enforceHeatOrThrow(meta: ModuleMetadata, currentHeat: HeatLevel) {
  if (!canRender(meta, currentHeat)) {
    throw new Error(`Renderer "${meta.id}" not allowed to run at heat=${currentHeat}`);
  }
}
