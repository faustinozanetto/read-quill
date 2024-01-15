import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ChevronUpIconProps = BaseIconProps;

export const ChevronUpIcon = forwardRef<SVGSVGElement, ChevronUpIconProps>(({ className, size, ...props }, ref) => (
  <svg
    ref={ref}
    className={cn(iconVariants({ size }), 'stroke-current', className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 15 12 9 18 15" />
  </svg>
));

ChevronUpIcon.displayName = 'ChevronUpIcon';
