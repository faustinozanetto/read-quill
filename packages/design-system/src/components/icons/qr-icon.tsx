import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type QRIconProps = BaseIconProps;

const QRIcon = forwardRef<SVGSVGElement, QRIconProps>(({ className, size, ...props }, ref) => {
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
      <rect height="6" rx="1" width="6" x="4" y="4" />
      <line x1="7" x2="7" y1="17" y2="17.01" />
      <rect height="6" rx="1" width="6" x="14" y="4" />
      <line x1="7" x2="7" y1="7" y2="7.01" />
      <rect height="6" rx="1" width="6" x="4" y="14" />
      <line x1="17" x2="17" y1="7" y2="7.01" />
      <line x1="14" x2="17" y1="14" y2="14" />
      <line x1="20" x2="20" y1="14" y2="14.01" />
      <line x1="14" x2="14" y1="14" y2="17" />
      <line x1="14" x2="17" y1="20" y2="20" />
      <line x1="17" x2="20" y1="17" y2="17" />
      <line x1="20" x2="20" y1="17" y2="20" />
    </svg>
  );
});

QRIcon.displayName = 'QRIcon';

export { QRIcon };
