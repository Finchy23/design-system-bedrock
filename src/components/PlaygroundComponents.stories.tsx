import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  ClinicalSpineHero,
  SchemaConstellation,
  FamilyTreeExplorer,
  SixPillarsDeepDive,
  VoiceTaxonomy,
  PrimitiveLibrary,
  RoutingEngine,
  ProofTransferSystem,
  HeatKbeMatrix,
  FourLayerArchitecture,
  PlaygroundShimmerStyles
} from './PlaygroundComponents';
import { Stack } from '../primitives/Stack';

const meta: Meta = {
  title: 'Playground/Component Builds'
};
export default meta;

type Story = StoryObj;

export const AllComponents: Story = {
  render: () => (
    <>
      <PlaygroundShimmerStyles />
      <Stack gap={6}>
        <ClinicalSpineHero />
        <SchemaConstellation />
        <FamilyTreeExplorer />
        <SixPillarsDeepDive />
        <VoiceTaxonomy />
        <PrimitiveLibrary />
        <RoutingEngine />
        <ProofTransferSystem />
        <HeatKbeMatrix />
        <FourLayerArchitecture />
      </Stack>
    </>
  )
};

const withShimmer = (node: React.ReactNode) => (
  <>
    <PlaygroundShimmerStyles />
    {node}
  </>
);

export const ClinicalSpine: Story = { render: () => withShimmer(<ClinicalSpineHero />) };
export const Constellation: Story = { render: () => withShimmer(<SchemaConstellation />) };
export const FamilyExplorer: Story = { render: () => withShimmer(<FamilyTreeExplorer />) };
export const Pillars: Story = { render: () => withShimmer(<SixPillarsDeepDive />) };
export const Voices: Story = { render: () => withShimmer(<VoiceTaxonomy />) };
export const Primitives: Story = { render: () => withShimmer(<PrimitiveLibrary />) };
export const Routing: Story = { render: () => withShimmer(<RoutingEngine />) };
export const ProofTransfer: Story = { render: () => withShimmer(<ProofTransferSystem />) };
export const HeatKbe: Story = { render: () => withShimmer(<HeatKbeMatrix />) };
export const Architecture: Story = { render: () => withShimmer(<FourLayerArchitecture />) };
