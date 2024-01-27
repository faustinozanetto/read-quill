import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ThropyIconProps = BaseIconProps;

const ThropyIcon = forwardRef<SVGSVGElement, ThropyIconProps>(({ className, size, ...props }, ref) => {
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
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
      <line x1="7" x2="17" y1="4" y2="4" />
      <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
      <circle cx="5" cy="9" r="2" />
      <circle cx="19" cy="9" r="2" />
    </svg>
  );
});

ThropyIcon.displayName = 'ThropyIcon';

export { ThropyIcon };
