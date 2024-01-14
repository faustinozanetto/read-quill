import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ArrowLeftIconProps = BaseIconProps;

const ArrowLeftIcon = forwardRef<SVGSVGElement, ArrowLeftIconProps>(({ className, size, ...props }, ref) => {
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
      <line x1="5" x2="19" y1="12" y2="12" />
      <line x1="5" x2="11" y1="12" y2="18" />
      <line x1="5" x2="11" y1="12" y2="6" />
    </svg>
  );
});

ArrowLeftIcon.displayName = 'ArrowLeftIcon';

export { ArrowLeftIcon };
