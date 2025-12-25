import { CheckCircle2, Star, Shield, BadgeCheck, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VerificationTier } from '@/lib/types';

interface DealerBadgeProps {
  verificationTier: VerificationTier;
  activityScore?: number;
  size?: 'sm' | 'md' | 'lg';
}

const DealerBadge = ({ verificationTier, activityScore, size = 'md' }: DealerBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const getVerificationConfig = () => {
    switch (verificationTier) {
      case 'business_verified':
        return {
          icon: Shield,
          label: 'Business',
          className: 'bg-success/10 text-success',
        };
      case 'id_verified':
        return {
          icon: BadgeCheck,
          label: 'ID Verified',
          className: 'bg-primary/10 text-primary',
        };
      default:
        return {
          icon: CircleDashed,
          label: 'Unverified',
          className: 'bg-muted text-muted-foreground',
        };
    }
  };

  const config = getVerificationConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        sizeClasses[size],
        config.className
      )}>
        <Icon className={iconSizes[size]} />
        {config.label}
      </span>
      {activityScore !== undefined && (
        <span className={cn(
          'inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent font-medium',
          sizeClasses[size]
        )}>
          <Star className={iconSizes[size]} />
          {activityScore}
        </span>
      )}
    </div>
  );
};

export default DealerBadge;
