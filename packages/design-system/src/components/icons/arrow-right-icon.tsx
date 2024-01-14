import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ArrowRightIconProps = BaseIconProps;

const ArrowRightIcon = forwardRef<SVGSVGElement, ArrowRightIconProps>(({ className, size, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      className={cn(iconVariants({ size }), 'stroke-current', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="13" y1="18" x2="19" y2="12" />
      <line x1="13" y1="6" x2="19" y2="12" />
    </svg>
  );
});

ArrowRightIcon.displayName = 'ArrowRightIcon';

export { ArrowRightIcon };
