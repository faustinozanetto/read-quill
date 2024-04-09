import { forwardRef } from 'react';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';
import { cn } from '../..';

export type HorizontalBarsIconProps = BaseIconProps;

const HorizontalBarsIcon = forwardRef<SVGSVGElement, HorizontalBarsIconProps>(({ className, size, ...props }, ref) => {
  return (
    <svg
      className={cn(iconVariants({ size }), 'fill-current', className)}
      fill="none"
      ref={ref}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
      </g>
    </svg>
  );
});

HorizontalBarsIcon.displayName = 'HorizontalBarsIcon';

export { HorizontalBarsIcon };
