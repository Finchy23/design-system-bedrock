import { RegisteredRenderer, RendererComponent, ModuleMetadata } from './types';

const registry = new Map<string, RegisteredRenderer>();

export function registerRenderer(meta: ModuleMetadata, component: RendererComponent) {
  if (!meta || !meta.id) throw new Error('Renderer metadata with `id` is required');
  if (registry.has(meta.id)) {
    console.warn(`Renderer with id "${meta.id}" is already registered: overwriting`);
  }
  registry.set(meta.id, { meta, component });
  return () => registry.delete(meta.id);
}

export function getRenderer(id: string): RegisteredRenderer | undefined {
  return registry.get(id);
}

export function listRenderers(): RegisteredRenderer[] {
  return Array.from(registry.values());
}

export function validateModule(meta: ModuleMetadata) {
  const required = ['id', 'intent', 'heatGate'];
  for (const r of required) {
    // @ts-ignore
    if (!(r in meta)) throw new Error(`Renderer module missing required metadata: ${r}`);
  }
}
