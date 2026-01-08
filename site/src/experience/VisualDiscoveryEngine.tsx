import React, { useMemo, useState } from 'react';
import EngineShell from '../chrome/EngineShell';
import AssistPanel from '../chrome/AssistPanel';
import ModuleShell from '../chrome/ModuleShell';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';
import DynamicChatPanel from './DynamicChatPanel';
import DiscoveryChatPanel from './DiscoveryChatPanel';
import ChatVisualization from './ChatVisualization';
import DiscoveryEngineFooter from './DiscoveryEngineFooter';
import { CATEGORIES, MODULES, DiscoveryModule } from './discoveryData';

type View = 'categories' | 'modules' | 'assist';

export default function VisualDiscoveryEngine() {
  const [view, setView] = useState<View>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [activeModuleId, setActiveModuleId] = useState<string | undefined>();
  const [path, setPath] = useState<string[]>([]);
  const activeModule = useMemo<DiscoveryModule | undefined>(() => MODULES.find(m => m.id === activeModuleId), [activeModuleId]);

  const openCategory = (id: string) => {
    setSelectedCategory(id);
    setView('modules');
    setPath((prev) => [...prev, id]);
  };

  const openModule = (id: string) => {
    setActiveModuleId(id);
    setPath((prev) => [...prev, id]);
    setView('modules');
  };

  return (
    <EngineShell>
      <Stack gap={4}>
        <ModuleShell
          eyebrow="Discovery"
          title="Visual Discovery Engine"
          body="Understand, believe, qualify, and commit in one experience."
        >
          {view === 'categories' && (
            <Stack gap={3}>
              {CATEGORIES.map((cat) => (
                <Surface key={cat.id} tone="base" padding="var(--space-4)">
                  <Stack gap={1}>
                    <Text as="div" variant="h3">{cat.name}</Text>
                    <Text as="div" variant="body" tone="muted">{cat.description}</Text>
                    <Button variant="secondary" onClick={() => openCategory(cat.id)}>Explore</Button>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          )}

          {view === 'modules' && (
            <Stack gap={3}>
              {activeModule ? (
                <Surface tone="raised" padding="var(--space-4)">
                  <Stack gap={2}>
                    <Text as="div" variant="h2">{activeModule.title}</Text>
                    <Text as="div" variant="body" tone="muted">{activeModule.body}</Text>
                    <Button variant="primary">Continue</Button>
                  </Stack>
                </Surface>
              ) : (
                <Text as="div" variant="body">Pick a module to start.</Text>
              )}

              <DynamicChatPanel categoryId={selectedCategory} onSelectModule={openModule} />
              <ChatVisualization path={path} activeModuleTitle={activeModule?.title} />
              <DiscoveryChatPanel onComplete={() => setView('assist')} />
            </Stack>
          )}

          {view === 'assist' && (
            <AssistPanel mode="qualify" />
          )}
        </ModuleShell>

        <DiscoveryEngineFooter onPrimary={() => setView('assist')} onSecondary={() => setView('modules')} />
      </Stack>
    </EngineShell>
  );
}
