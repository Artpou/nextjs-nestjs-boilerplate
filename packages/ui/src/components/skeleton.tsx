import { cn } from '@workspace/ui/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

function Skeleton({ className, text, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    >
      {text ? <span className="invisible">{text}</span> : null}
    </div>
  );
}

export { Skeleton };
