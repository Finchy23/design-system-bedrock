import React, { useState } from 'react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import { Button } from '../../primitives/Button';

export type HeroCta = { label: string; onClick?: () => void; variant?: 'primary' | 'secondary' | 'tertiary' };

export type HeroBlockProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  kicker?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
};

export function HeroBlock({ eyebrow, title, subtitle, kicker, primaryCta, secondaryCta }: HeroBlockProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  return (
    <Stack
      gap={3}
      className="fade-up"
      style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(120% 120% at 10% 20%, rgba(65,105,225,0.12), transparent)', transform: `perspective(1000px) rotateX(${parallax.y}deg) rotateY(${parallax.x}deg)` }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
        setParallax({ x, y });
      }}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
    >
      {eyebrow && <Text variant="eyebrow" tone="muted">{eyebrow}</Text>}
      <Text variant="h1">{title}</Text>
      {subtitle && <Text variant="body" tone="muted">{subtitle}</Text>}
      {kicker && <Text variant="meta" tone="muted">{kicker}</Text>}
      {(primaryCta || secondaryCta) && (
        <Stack gap={2} inline align="center" style={{ flexWrap: 'wrap' }}>
          {primaryCta && (
            <Button variant={primaryCta.variant ?? 'primary'} onClick={primaryCta.onClick}>
              {primaryCta.label}
            </Button>
          )}
          {secondaryCta && (
            <Button variant={secondaryCta.variant ?? 'secondary'} onClick={secondaryCta.onClick}>
              {secondaryCta.label}
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
}

export default HeroBlock;
