import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ArrowDoubleRightIconProps = BaseIconProps;

const ArrowDoubleRightIcon = forwardRef<SVGSVGElement, ArrowDoubleRightIconProps>(
  ({ className, size, ...props }, ref) => {
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
        <line x1="21" x2="3" y1="17" y2="17" />
        <path d="M18 4l3 3l-3 3" />
        <path d="M18 20l3 -3l-3 -3" />
        <line x1="21" x2="3" y1="7" y2="7" />
      </svg>
    );
  }
);

ArrowDoubleRightIcon.displayName = 'ArrowDoubleRightIcon';

export { ArrowDoubleRightIcon };
