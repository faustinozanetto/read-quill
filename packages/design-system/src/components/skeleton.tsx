import { forwardRef } from 'react';
import { cn } from '..';

export type SkeletonProps = React.ButtonHTMLAttributes<HTMLDivElement>;

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => {
  return <div className={cn('bg-primary/10 animate-pulse rounded', className)} ref={ref} {...props} />;
});

Skeleton.displayName = 'Skeleton';

export { Skeleton };
