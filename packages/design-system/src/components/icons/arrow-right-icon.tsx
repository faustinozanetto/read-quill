import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ArrowRightIconProps = BaseIconProps;

const ArrowRightIcon = forwardRef<SVGSVGElement, ArrowRightIconProps>(({ className, size, ...props }, ref) => {
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
      <line x1="13" x2="19" y1="18" y2="12" />
      <line x1="13" x2="19" y1="6" y2="12" />
    </svg>
  );
});

ArrowRightIcon.displayName = 'ArrowRightIcon';

export { ArrowRightIcon };
