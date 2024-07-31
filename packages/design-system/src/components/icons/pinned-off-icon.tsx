import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type PinnedOffIconProps = BaseIconProps;

const PinnedOffIcon = forwardRef<SVGSVGElement, PinnedOffIconProps>(({ className, size, ...props }, ref) => {
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
      <line x1="3" y1="3" x2="21" y2="21" />
      <path d="M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251" />
      <line x1="9" y1="15" x2="4.5" y2="19.5" />
      <line x1="14.5" y1="4" x2="20" y2="9.5" />
    </svg>
  );
});

PinnedOffIcon.displayName = 'PinnedOffIcon';

export { PinnedOffIcon };
