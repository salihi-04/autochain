import { CheckCircle2, Star, Shield, BadgeCheck, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VerificationTier } from '@/lib/types';

interface VerificationBadgeProps {
  tier: VerificationTier;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const VerificationBadge = ({ tier, size = 'md', showLabel = true }: VerificationBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const getConfig = () => {
    switch (tier) {
      case 'business_verified':
        return {
          icon: Shield,
          label: 'Business Verified',
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

  const config = getConfig();
  const Icon = config.icon;

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      sizeClasses[size],
      config.className
    )}>
      <Icon className={iconSizes[size]} />
      {showLabel && config.label}
    </span>
  );
};

export default VerificationBadge;
