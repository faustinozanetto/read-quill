import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type TargetIconProps = BaseIconProps;

export const TargetIcon = forwardRef<SVGSVGElement, TargetIconProps>(({ className, size, ...props }, ref) => (
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
    <circle cx="12" cy="12" r="1" />
    <path d="M12 7a5 5 0 1 0 5 5" />
    <path d="M13.004 3.055a9 9 0 1 0 7.941 7.945" />
    <path d="M15 6v3h3l3 -3h-3v-3z" />
    <path d="M15 9l-3 3" />
  </svg>
));

TargetIcon.displayName = 'TargetIcon';
