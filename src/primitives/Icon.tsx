import * as React from "react";
import type { LucideIcon } from "lucide-react";

type Size = 'xs'|'sm'|'md'|'lg';
type Tone = 'brand'|'muted'|'primary'|'white';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  icon: LucideIcon;
  size?: Size;
  tone?: Tone;
  label?: string;
};

const sizeMap: Record<Size, string> = { xs: '12px', sm: '16px', md: '20px', lg: '24px' };
const toneMap: Record<Tone, string> = { brand: 'var(--color-brand-primary)', muted: 'var(--color-text-muted)', primary: 'var(--color-text-primary)', white: 'var(--color-text-on-brand)' };

export function Icon({ icon: I, size = 'md', tone = 'primary', label, ...rest }: IconProps) {
  const aria = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  // @ts-ignore - LucideIcon is callable as a component
  const Comp = I as any;
  return <Comp width={sizeMap[size]} height={sizeMap[size]} stroke={toneMap[tone]} {...aria} {...rest} />;
}

export default Icon;
