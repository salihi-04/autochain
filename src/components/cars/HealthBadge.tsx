import { cn } from '@/lib/utils';
import { getHealthColor, getHealthBgColor } from '@/lib/mockData';

interface HealthBadgeProps {
  percent: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const HealthBadge = ({ percent, size = 'md', showLabel = true }: HealthBadgeProps) => {
  const colorClass = getHealthColor(percent);
  const bgColorClass = getHealthBgColor(percent);
  
  const sizeClasses = {
    sm: 'h-1.5 w-12',
    md: 'h-2 w-16',
    lg: 'h-3 w-24',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn('rounded-full bg-muted overflow-hidden', sizeClasses[size])}>
        <div 
          className={cn('h-full rounded-full transition-all duration-500', bgColorClass)}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn('font-semibold', textSizes[size], colorClass)}>
          {percent}%
        </span>
      )}
    </div>
  );
};

export default HealthBadge;
