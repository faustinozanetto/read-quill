import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ChevronRightIconProps = BaseIconProps;

export const ChevronRightIcon = forwardRef<SVGSVGElement, ChevronRightIconProps>(
  ({ className, size, ...props }, ref) => (
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
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
);

ChevronRightIcon.displayName = 'ChevronRightIcon';
