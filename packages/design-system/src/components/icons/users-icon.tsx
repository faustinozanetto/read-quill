import { forwardRef } from 'react';
import { cn } from '../..';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type UserIconProps = BaseIconProps;

export const UserIcon = forwardRef<SVGSVGElement, UserIconProps>(({ className, size, ...props }, ref) => (
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
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
));

UserIcon.displayName = 'UserIcon';
