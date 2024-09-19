import { forwardRef } from 'react';
import { cn } from '../../lib/design-system.lib';
import type { BaseIconProps } from './base-icon';
import { iconVariants } from './base-icon';

export type FileUploadIconProps = BaseIconProps;

const FileUploadIcon = forwardRef<SVGSVGElement, FileUploadIconProps>(({ className, size, ...props }, ref) => {
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
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d="M12 11v6" />
      <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
    </svg>
  );
});

FileUploadIcon.displayName = 'FileUploadIcon';

export { FileUploadIcon };
