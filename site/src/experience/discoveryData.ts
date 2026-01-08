export type DiscoveryCategory = {
  id: string;
  name: string;
  description: string;
};

export type DiscoveryModule = {
  id: string;
  categoryId: string;
  title: string;
  body: string;
  type: 'reveal' | 'deep-dive' | 'journey' | 'evidence' | 'subscription';
};

export const CATEGORIES: DiscoveryCategory[] = [
  { id: 'clarity', name: 'Clarity', description: 'Understand what the product is and is not.' },
  { id: 'evidence', name: 'Evidence', description: 'See proof that it works.' },
  { id: 'fit', name: 'Fit', description: 'Decide if this is for you.' }
];

export const MODULES: DiscoveryModule[] = [
  { id: 'reveal-tiles', categoryId: 'clarity', title: 'Reveal Tiles', body: 'Uncover the core parts of the offer in one glance.', type: 'reveal' },
  { id: 'deep-dive', categoryId: 'clarity', title: 'Deep Dive', body: 'Detailed walkthrough of the system in context.', type: 'deep-dive' },
  { id: 'journey-walk', categoryId: 'fit', title: 'Journey Walkthrough', body: 'See how you move from start to goal.', type: 'journey' },
  { id: 'evidence', categoryId: 'evidence', title: 'Evidence Showcase', body: 'Clinical outcomes and case studies.', type: 'evidence' },
  { id: 'subscription-flow', categoryId: 'fit', title: 'Subscription Flow', body: 'Commit in one motion with the right tier.', type: 'subscription' }
];

export const suggestedModules = (categoryId?: string) =>
  MODULES.filter(m => !categoryId || m.categoryId === categoryId).slice(0, 3);
