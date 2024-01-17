import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type XIconProps = BaseIconProps;

const XIcon = forwardRef<SVGSVGElement, XIconProps>(({ className, size, ...props }, ref) => {
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
      <line x1="7" x2="17" y1="4" y2="20" />
      <line x1="17" x2="7" y1="4" y2="20" />
    </svg>
  );
});

XIcon.displayName = 'XIcon';

export { XIcon };
