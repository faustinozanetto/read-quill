import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type CalendarIconProps = BaseIconProps;

const CalendarIcon = forwardRef<SVGSVGElement, CalendarIconProps>(({ className, size, ...props }, ref) => {
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
      <rect height="16" rx="2" width="16" x="4" y="5" />
      <line x1="16" x2="16" y1="3" y2="7" />
      <line x1="8" x2="8" y1="3" y2="7" />
      <line x1="4" x2="20" y1="11" y2="11" />
      <line x1="11" x2="12" y1="15" y2="15" />
      <line x1="12" x2="12" y1="15" y2="18" />
    </svg>
  );
});

CalendarIcon.displayName = 'CalendarIcon';

export { CalendarIcon };
