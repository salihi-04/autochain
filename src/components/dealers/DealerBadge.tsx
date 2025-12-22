import { CheckCircle2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DealerBadgeProps {
  isVerified: boolean;
  activityScore?: number;
  size?: 'sm' | 'md' | 'lg';
}

const DealerBadge = ({ isVerified, activityScore, size = 'md' }: DealerBadgeProps) => {
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

  return (
    <div className="flex items-center gap-2">
      {isVerified && (
        <span className={cn(
          'inline-flex items-center gap-1 rounded-full bg-success/10 text-success font-medium',
          sizeClasses[size]
        )}>
          <CheckCircle2 className={iconSizes[size]} />
          Verified
        </span>
      )}
      {activityScore !== undefined && (
        <span className={cn(
          'inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent font-medium',
          sizeClasses[size]
        )}>
          <Star className={iconSizes[size]} />
          {activityScore} points
        </span>
      )}
    </div>
  );
};

export default DealerBadge;
