import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ChevronsLeftIconProps = BaseIconProps;

export const ChevronsLeftIcon = forwardRef<SVGSVGElement, ChevronsLeftIconProps>(
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
      <polyline points="11 7 6 12 11 17" />
      <polyline points="17 7 12 12 17 17" />
    </svg>
  )
);

ChevronsLeftIcon.displayName = 'ChevronsLeftIcon';
