import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type HeartPlusIconProps = BaseIconProps;

const HeartPlusIcon = forwardRef<SVGSVGElement, HeartPlusIconProps>(({ className, size, ...props }, ref) => {
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
      <path d="M13 19l-1 1l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 0 1 8.003 5.996" />
      <path d="M14 16h6" />
      <path d="M17 13v6" />
    </svg>
  );
});

HeartPlusIcon.displayName = 'HeartPlusIcon';

export { HeartPlusIcon };
