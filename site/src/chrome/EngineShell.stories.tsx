import React from 'react';
import { Meta, Story } from '@storybook/react';
import EngineShell from './EngineShell';
import AssistPanel from './AssistPanel';

export default {
  title: 'Chrome/EngineShell',
  component: EngineShell
} as Meta;

const Template: Story = (args) => (
  <EngineShell>
    <div>
      <h1>Stage content</h1>
      <AssistPanel mode={args.mode} />
    </div>
  </EngineShell>
);

export const Default = Template.bind({});
Default.args = { mode: 'navigate' };

export const Qualify = Template.bind({});
Qualify.args = { mode: 'qualify' };

export const Answer = Template.bind({});
Answer.args = { mode: 'answer' };
