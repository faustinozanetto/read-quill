import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type NumberFourIconProps = BaseIconProps;

export const NumberFourIcon = forwardRef<SVGSVGElement, NumberFourIconProps>(({ className, size, ...props }, ref) => (
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
    <path d="M10 8v3a1 1 0 0 0 1 1h3" />
    <path d="M14 8v8" />
  </svg>
));

NumberFourIcon.displayName = 'NumberFourIcon';
