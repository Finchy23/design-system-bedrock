import * as React from "react";

type Gap = 1|2|3|4|5|6|7|8;

export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
  gap?: Gap;
  inline?: boolean;
  align?: 'start'|'center'|'end'|'stretch';
};

const gapMap: Record<Gap, string> = {
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  7: 'var(--space-7)',
  8: 'var(--space-8)'
};

export function Stack({ as: As = 'div', gap = 4, inline = false, align = 'start', style, children, ...rest }: StackProps) {
  const display = inline ? 'inline-flex' : 'flex';
  const composedStyle: React.CSSProperties = {
    display,
    gap: gapMap[gap],
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align === 'center' ? 'center' : 'stretch',
    ...style
  };

  return <As style={composedStyle} {...rest}>{children}</As>;
}

export default Stack;
