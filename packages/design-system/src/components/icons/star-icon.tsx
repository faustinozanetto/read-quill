import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type StarIconProps = BaseIconProps;

const StarIcon = forwardRef<SVGSVGElement, StarIconProps>(({ className, size, ...props }, ref) => {
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
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  );
});

StarIcon.displayName = 'StarIcon';

export { StarIcon };
