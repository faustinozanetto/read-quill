import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type GoogleIconProps = BaseIconProps;

const GoogleIcon = forwardRef<SVGSVGElement, GoogleIconProps>(({ className, size, ...props }, ref) => {
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
      <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
    </svg>
  );
});

GoogleIcon.displayName = 'GoogleIcon';

export { GoogleIcon };
