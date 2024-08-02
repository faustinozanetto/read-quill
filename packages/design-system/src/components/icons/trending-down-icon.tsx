import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type TrendingDownIconProps = BaseIconProps;

const TrendingDownIcon = forwardRef<SVGSVGElement, TrendingDownIconProps>(({ className, size, ...props }, ref) => {
  return (
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
      <polyline points="3 7 9 13 13 9 21 17" />
      <polyline points="21 10 21 17 14 17" />
    </svg>
  );
});

TrendingDownIcon.displayName = 'TrendingDownIcon';

export { TrendingDownIcon };
