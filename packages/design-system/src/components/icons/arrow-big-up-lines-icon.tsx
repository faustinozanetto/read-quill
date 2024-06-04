import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ArrowBigUpLinesIconProps = BaseIconProps;

const ArrowBigUpLinesIcon = forwardRef<SVGSVGElement, ArrowBigUpLinesIconProps>(
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
        <path d="M9 12h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v3h-6v-3z" />
        <path d="M9 21h6" />
        <path d="M9 18h6" />
      </svg>
    );
  }
);

ArrowBigUpLinesIcon.displayName = 'ArrowBigUpLinesIcon';

export { ArrowBigUpLinesIcon };
