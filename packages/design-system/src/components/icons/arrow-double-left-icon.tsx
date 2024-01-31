import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ArrowDoubleLeftIconProps = BaseIconProps;

const ArrowDoubleLeftIcon = forwardRef<SVGSVGElement, ArrowDoubleLeftIconProps>(
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
        <line x1="3" x2="21" y1="7" y2="7" />
        <path d="M6 20l-3 -3l3 -3" />
        <path d="M6 4l-3 3l3 3" />
        <line x1="3" x2="21" y1="17" y2="17" />
      </svg>
    );
  }
);

ArrowDoubleLeftIcon.displayName = 'ArrowDoubleLeftIcon';

export { ArrowDoubleLeftIcon };
