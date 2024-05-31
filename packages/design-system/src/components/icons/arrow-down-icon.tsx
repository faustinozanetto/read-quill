import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ArrowDownIconProps = BaseIconProps;

const ArrowDownIcon = forwardRef<SVGSVGElement, ArrowDownIconProps>(({ className, size, ...props }, ref) => {
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
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="18" x2="12" y1="13" y2="19" />
      <line x1="6" x2="12" y1="13" y2="19" />
    </svg>
  );
});

ArrowDownIcon.displayName = 'ArrowDownIcon';

export { ArrowDownIcon };
