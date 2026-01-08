import React, { useEffect, useRef, useState } from 'react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import Icon from '../../primitives/Icon';

export type LoopStep = { key: 'READ' | 'ROUTE' | 'DELIVER' | 'SEAL'; title: string; body: string; icon?: string };

const defaultSteps: LoopStep[] = [
  { key: 'READ', title: 'READ', body: 'Know the moment. State first.', icon: 'activity' },
  { key: 'ROUTE', title: 'ROUTE', body: 'Choose the right dose and target.', icon: 'map' },
  { key: 'DELIVER', title: 'DELIVER', body: 'Make it doable. Journeys + NaviCues.', icon: 'zap' },
  { key: 'SEAL', title: 'SEAL', body: 'Keep the receipt. Proof without punishment.', icon: 'check-circle' }
];

export type LoopExplainerBlockProps = {
  steps?: LoopStep[];
  title?: string;
  subtitle?: string;
};

export function LoopExplainerBlock({ steps = defaultSteps, title = 'READ. ROUTE. DELIVER. SEAL.', subtitle }: LoopExplainerBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number>();
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!steps.length || prefersReducedMotionRef.current || isPaused) return;
    setActiveIndex(0);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 1400);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [steps.length, isPaused]);

  return (
    <Stack gap={3} className="fade-up">
      <Text variant="h3">{title}</Text>
      {subtitle && <Text variant="body" tone="muted">{subtitle}</Text>}
      <Stack
        gap={3}
        inline
        style={{ flexWrap: 'wrap' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {steps.map((s, idx) => (
          <Stack key={s.key} gap={1} style={{ minWidth: 200, maxWidth: 260 }} className="card-hover">
            <Stack gap={1} inline align="center" className="shimmer-line" style={{ opacity: activeIndex === idx ? 1 : 0.6 }}>
              <Icon name={s.icon ?? 'circle'} size={16} color="var(--color-brand-primary)" />
              <Text variant="eyebrow" tone="muted">{s.title}</Text>
            </Stack>
            <Text variant="body">{s.body}</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default LoopExplainerBlock;
