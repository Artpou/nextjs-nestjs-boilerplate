import { LucideIcon } from 'lucide-react';

import { Skeleton } from '@workspace/ui/components/skeleton';

interface ContactInfoProps {
  icon: LucideIcon;
  label: string;
  value?: string | null;
  href?: string | null;
  className?: string;
  isLoading?: boolean;
}

export function ContactInfo({
  icon: Icon,
  label,
  value,
  href,
  className = '',
  isLoading = false,
}: ContactInfoProps) {
  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <Icon className="size-4 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <span className="text-sm text-primary hover:underline">
          {isLoading ? (
            <Skeleton text={`${label} placeholder`} />
          ) : (
            (value ?? '-')
          )}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
