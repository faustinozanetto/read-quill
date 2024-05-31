import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type NumberTwoIconProps = BaseIconProps;

export const NumberTwoIcon = forwardRef<SVGSVGElement, NumberTwoIconProps>(({ className, size, ...props }, ref) => (
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
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3" />
  </svg>
));

NumberTwoIcon.displayName = 'NumberTwoIcon';
