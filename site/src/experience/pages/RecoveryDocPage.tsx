import React from 'react';
import { PageSection } from '../blocks/PageSection';
import { RecoveryOSExperience } from '../../components/RecoveryOSExperience';
import { FoundationDeck } from '../../components/FoundationBlocks';
import { RecoveryContinuityShowcase } from '../../components/ContinuityEngineBlocks';
import { CriticalRecoveryDeck } from '../../components/CriticalRecoveryDeck';

export function RecoveryDocPage() {
  return (
    <div>
      <PageSection tone="overlay">
        <RecoveryOSExperience />
      </PageSection>

      <PageSection>
        <FoundationDeck />
      </PageSection>

      <PageSection>
        <RecoveryContinuityShowcase />
      </PageSection>

      <PageSection>
        <CriticalRecoveryDeck />
      </PageSection>
    </div>
  );
}

export default RecoveryDocPage;
