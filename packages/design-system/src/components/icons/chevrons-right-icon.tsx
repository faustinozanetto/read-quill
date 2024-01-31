import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ChevronsRightIconProps = BaseIconProps;

export const ChevronsRightIcon = forwardRef<SVGSVGElement, ChevronsRightIconProps>(
  ({ className, size, ...props }, ref) => (
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
      <polyline points="7 7 12 12 7 17" />
      <polyline points="13 7 18 12 13 17" />
    </svg>
  )
);

ChevronsRightIcon.displayName = 'ChevronsRightIcon';
