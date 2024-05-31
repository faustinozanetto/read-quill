import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type ManageIconProps = BaseIconProps;

const ManageIcon = forwardRef<SVGSVGElement, ManageIconProps>(({ className, size, ...props }, ref) => {
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
      <circle cx="14" cy="6" r="2" />
      <line x1="4" x2="12" y1="6" y2="6" />
      <line x1="16" x2="20" y1="6" y2="6" />
      <circle cx="8" cy="12" r="2" />
      <line x1="4" x2="6" y1="12" y2="12" />
      <line x1="10" x2="20" y1="12" y2="12" />
      <circle cx="17" cy="18" r="2" />
      <line x1="4" x2="15" y1="18" y2="18" />
      <line x1="19" x2="20" y1="18" y2="18" />
    </svg>
  );
});

ManageIcon.displayName = 'ManageIcon';

export { ManageIcon };
