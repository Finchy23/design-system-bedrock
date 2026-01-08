import React from 'react';
import { Story, Meta } from '@storybook/react';
import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card
} as Meta;

const Template: Story<any> = (args) => <Card {...args}>Card content</Card>;

export const Default = Template.bind({});
Default.args = { interactive: false };

export const Interactive = Template.bind({});
Interactive.args = { interactive: true };
