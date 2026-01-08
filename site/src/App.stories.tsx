import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { App, RouteKey } from './App';

const meta: Meta<typeof App> = {
  title: 'Site/App'
};

export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {
  render: () => {
    const [route, setRoute] = useState<RouteKey>('home');
    return <App route={route} onNavigate={setRoute} />;
  }
};
