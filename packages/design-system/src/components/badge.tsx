import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/design-system.lib';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/80 text-primary-foreground hover:bg-primary/70',
        secondary: 'border-transparent bg-secondary/80 text-secondary-foreground hover:bg-secondary/70',
        destructive: 'border-transparent bg-destructive/80 text-destructive-foreground hover:bg-destructive/70',
        success: 'border-transparent bg-success/80 text-success-foreground hover:bg-success/70',
        info: 'border-transparent bg-info/80 text-info-foreground hover:bg-info/87',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps): React.JSX.Element {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
