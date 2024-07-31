import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type PinnedIconProps = BaseIconProps;

const PinnedIcon = forwardRef<SVGSVGElement, PinnedIconProps>(({ className, size, ...props }, ref) => {
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
      <path d="M9 4v6l-2 4v2h10v-2l-2 -4v-6" />
      <line x1="12" y1="16" x2="12" y2="21" />
      <line x1="8" y1="4" x2="16" y2="4" />
    </svg>
  );
});

PinnedIcon.displayName = 'PinnedIcon';

export { PinnedIcon };
