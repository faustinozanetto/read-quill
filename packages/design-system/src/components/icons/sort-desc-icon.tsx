import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type SortDescIconProps = BaseIconProps;

export const SortDescIcon = forwardRef<SVGSVGElement, SortDescIconProps>(({ className, size, ...props }, ref) => (
  <svg
    className={cn(iconVariants({ size }), 'stroke-current', className)}
    fill="none"
    ref={ref}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <line x1="4" x2="13" y1="6" y2="6" />
    <line x1="4" x2="11" y1="12" y2="12" />
    <line x1="4" x2="11" y1="18" y2="18" />
    <polyline points="15 15 18 18 21 15" />
    <line x1="18" x2="18" y1="6" y2="18" />
  </svg>
));

SortDescIcon.displayName = 'SortDescIcon';
