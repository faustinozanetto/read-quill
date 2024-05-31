import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type AdjustmentsIconProps = BaseIconProps;

const AdjustmentsIcon = forwardRef<SVGSVGElement, AdjustmentsIconProps>(({ className, size, ...props }, ref) => {
  return (
    <svg
      className={cn(iconVariants({ size }), 'stroke-current rotate-90', className)}
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
      <circle cx="6" cy="10" r="2" />
      <line x1="6" x2="6" y1="4" y2="8" />
      <line x1="6" x2="6" y1="12" y2="20" />
      <circle cx="12" cy="16" r="2" />
      <line x1="12" x2="12" y1="4" y2="14" />
      <line x1="12" x2="12" y1="18" y2="20" />
      <circle cx="18" cy="7" r="2" />
      <line x1="18" x2="18" y1="4" y2="5" />
      <line x1="18" x2="18" y1="9" y2="20" />
    </svg>
  );
});

AdjustmentsIcon.displayName = 'AdjustmentsIcon';

export { AdjustmentsIcon };
