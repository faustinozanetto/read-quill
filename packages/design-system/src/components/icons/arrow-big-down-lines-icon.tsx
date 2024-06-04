import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ArrowBigDownLinesIconProps = BaseIconProps;

const ArrowBigDownLinesIcon = forwardRef<SVGSVGElement, ArrowBigDownLinesIconProps>(
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 12h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-3h6v3z" />
        <path d="M15 3h-6" />
        <path d="M15 6h-6" />
      </svg>
    );
  }
);

ArrowBigDownLinesIcon.displayName = 'ArrowBigDownLinesIcon';

export { ArrowBigDownLinesIcon };
