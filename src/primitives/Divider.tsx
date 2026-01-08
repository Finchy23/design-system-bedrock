import * as React from "react";

export function Divider({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div style={{ height: '1px', background: 'var(--color-border-default)', width: '100%', ...style }} className={className} />;
}

export default Divider;
