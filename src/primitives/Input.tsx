import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function Input({ hasError = false, style, ...rest }: InputProps) {
  const base: React.CSSProperties = {
    padding: '10px 12px',
    border: `1px solid var(--color-border-default)`,
    background: 'transparent',
    color: 'var(--color-text-primary)'
  };

  const errorStyle: React.CSSProperties = hasError ? { border: `1px solid var(--color-danger)` } : {};

  return <input style={{ ...base, ...errorStyle, ...style }} {...rest} />;
}

export default Input;
