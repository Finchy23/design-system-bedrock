import type { Meta, StoryObj } from '@storybook/react';
import MediaEnricherAdmin, { MediaEnrichRun } from './MediaEnricherAdmin';

const mockRuns: MediaEnrichRun[] = [
  {
    id: 'run-3',
    started_at: '2024-01-04T10:12:00Z',
    status: 'succeeded',
    total_files: 120,
    processed_files: 120,
    succeeded: 118,
    failed: 2
  },
  {
    id: 'run-2',
    started_at: '2024-01-03T09:10:00Z',
    status: 'running',
    total_files: 200,
    processed_files: 140,
    succeeded: 138,
    failed: 2
  },
  {
    id: 'run-1',
    started_at: '2024-01-02T08:05:00Z',
    status: 'failed',
    total_files: 50,
    processed_files: 20,
    succeeded: 18,
    failed: 2
  }
];

const meta: Meta<typeof MediaEnricherAdmin> = {
  title: 'Experience/MediaEnricherAdmin',
  component: MediaEnricherAdmin,
  argTypes: {
    supabaseUrl: { control: { type: 'text' } },
    defaultBucket: { control: { type: 'text' } },
    defaultPrefix: { control: { type: 'text' } },
    defaultLimit: { control: { type: 'number' } },
    pollIntervalMs: { control: { type: 'number' } }
  }
};

export default meta;

type Story = StoryObj<typeof MediaEnricherAdmin>;

export const Mocked: Story = {
  args: {
    defaultBucket: 'dashboard-assets',
    defaultPrefix: 'images/',
    defaultLimit: 200,
    // Provide mocks so Storybook does not call real endpoints
    invokeBackfill: async () => Promise.resolve(),
    loadRuns: async () => Promise.resolve(mockRuns)
  }
};
