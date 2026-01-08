import React, { useEffect, useRef } from 'react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import ProofStrip from '../../primitives/ProofStrip';

export type ProofBlockProps = {
  stage?: 'receipt' | 'transfer' | 'trajectory';
  title?: string;
  subtitle?: string;
  bullets?: string[];
};

export function ProofBlock({ stage = 'receipt', title = 'Proof, without punishment.', subtitle, bullets }: ProofBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-up');
        }
      });
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Stack gap={3} ref={ref}>
      <Text variant="h3">{title}</Text>
      {subtitle && <Text variant="body" tone="muted">{subtitle}</Text>}
      <ProofStrip stage={stage} subtitle={subtitle ?? 'Receipt → Transfer → Trajectory'} />
      {bullets && bullets.length > 0 && (
        <Stack gap={1}>
          {bullets.map((b, idx) => (
            <Text key={idx} variant="body" tone="muted" className="fade-up" style={{ animationDelay: `${idx * 80}ms` }}>• {b}</Text>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default ProofBlock;
