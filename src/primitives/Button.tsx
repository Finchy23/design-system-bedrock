import * as React from "react";

type Variant = 'primary'|'secondary'|'tertiary';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = 'primary', disabled, style, children, ...rest }: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 12px',
    border: '1px solid transparent',
    background: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 'var(--radius)',
    transition: `transform var(--motion-fast) ease, background var(--motion-fast) ease, border-color var(--motion-fast) ease`,
  };

  const variantStyle: Record<Variant, React.CSSProperties> = {
    primary: { background: 'var(--color-brand-primary)', color: 'var(--color-text-on-brand)', borderColor: 'var(--color-brand-primary)' },
    secondary: { background: 'transparent', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' },
    tertiary: { background: 'transparent', color: 'var(--color-text-muted)' }
  };

  const composed = { ...baseStyle, ...variantStyle[variant], ...style };
  return <button disabled={disabled} style={composed} {...rest}>{children}</button>;
}

export default Button;
