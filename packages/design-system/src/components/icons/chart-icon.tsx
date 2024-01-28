import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ChartIconProps = BaseIconProps;

const ChartIcon = forwardRef<SVGSVGElement, ChartIconProps>(({ className, size, ...props }, ref) => {
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
      <line x1="4" y1="19" x2="20" y2="19" />
      <polyline points="4 15 8 9 12 11 16 6 20 10" />
    </svg>
  );
});

ChartIcon.displayName = 'ChartIcon';

export { ChartIcon };
