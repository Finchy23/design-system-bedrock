import * as React from "react";

type Tone = "base" | "raised" | "overlay";

export type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
  tone?: Tone;
  padding?: string; // token like var(--space-4) or css value
  glass?: boolean;
};

export function Surface({ as: As = 'div', tone = 'base', padding = 'var(--space-4)', glass = false, style, children, ...rest }: SurfaceProps) {
  const bg = {
    base: 'var(--color-bg-surface)',
    raised: 'var(--color-bg-surface)',
    overlay: 'var(--color-bg-overlay)'
  }[tone];

  const boxShadow = tone === 'raised' ? '0 6px 18px rgba(11,17,32,0.06)' : 'none';

  const composedStyle: React.CSSProperties = {
    background: bg,
    padding,
    boxShadow,
    border: `1px solid var(--color-border-default)`,
    borderRadius: 'var(--radius)',
    WebkitBackdropFilter: glass ? 'blur(8px)' : undefined,
    backdropFilter: glass ? 'blur(8px)' : undefined,
    ...style,
  };

  return <As style={composedStyle} {...rest}>{children}</As>;
}

export default Surface;
