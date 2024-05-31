import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type FileIconProps = BaseIconProps;

const FileIcon = forwardRef<SVGSVGElement, FileIconProps>(({ className, size, ...props }, ref) => {
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
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
      <circle cx="16.5" cy="17.5" r="2.5" />
      <line x1="18.5" x2="21" y1="19.5" y2="22" />
    </svg>
  );
});

FileIcon.displayName = 'FileIcon';

export { FileIcon };
