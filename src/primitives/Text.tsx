import * as React from "react";

type Variant = "h1" | "h2" | "h3" | "body" | "small" | "meta" | "eyebrow";
type Tone = "primary" | "muted" | "brand" | "danger" | "success" | "warning";

export type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  variant?: Variant;
  tone?: Tone;
};

export function Text({ as: As = "p", variant = "body", tone = "primary", className, children, ...rest }: TextProps) {
  const sizeStyle: Record<Variant, React.CSSProperties> = {
    h1: { fontSize: 'var(--type-size-h1)', fontWeight: 'var(--type-weight-semibold)' },
    h2: { fontSize: 'var(--type-size-h2)', fontWeight: 'var(--type-weight-medium)' },
    h3: { fontSize: 'var(--type-size-h3)', fontWeight: 'var(--type-weight-medium)' },
    body: { fontSize: 'var(--type-size-body)', fontWeight: 'var(--type-weight-regular)' },
    small: { fontSize: 'var(--type-size-small)', fontWeight: 'var(--type-weight-regular)' },
    meta: { fontSize: 'var(--type-size-small)', fontWeight: 'var(--type-weight-medium)' },
    eyebrow: { fontSize: 'var(--type-size-small)', fontWeight: 'var(--type-weight-medium)', textTransform: 'uppercase', letterSpacing: '0.06em' },
  };

  const toneColor: Record<Tone, string> = {
    primary: 'var(--color-text-primary)',
    muted: 'var(--color-text-muted)',
    brand: 'var(--color-brand-primary)',
    danger: 'var(--color-safety)',
    success: 'var(--color-receipt)',
    warning: 'var(--color-drift)',
  };

  return (
    <As style={{ color: toneColor[tone], ...sizeStyle[variant] }} className={className} {...rest}>
      {children}
    </As>
  );
}

export default Text;
