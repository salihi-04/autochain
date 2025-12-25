import type { CarHealthSummary } from '@/lib/types';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarHealthCardProps {
  healthSummary: CarHealthSummary;
  healthPercent: number;
  className?: string;
}

const CarHealthCard = ({ healthSummary, healthPercent, className }: CarHealthCardProps) => {
  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-success/70" />;
      case 'fair':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'needs_attention':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getConditionLabel = (condition: string) => {
    return condition.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getAccidentIcon = (history: string) => {
    switch (history) {
      case 'none':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'minor':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'major':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getHealthColor = () => {
    if (healthPercent >= 80) return 'text-success';
    if (healthPercent >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className={cn("bg-secondary/50 rounded-xl p-4 space-y-3", className)}>
      {/* Header with health score */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-card-foreground text-sm">Health Summary</h4>
        <div className={cn("flex items-center gap-1.5 font-bold", getHealthColor())}>
          <Gauge className="h-4 w-4" />
          {healthPercent}%
        </div>
      </div>

      {/* Condition grid */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg">
          {getAccidentIcon(healthSummary.accidentHistory)}
          <div>
            <p className="text-muted-foreground text-xs">Accident</p>
            <p className="font-medium text-card-foreground capitalize">
              {healthSummary.accidentHistory === 'none' ? 'None' : healthSummary.accidentHistory}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg">
          {getConditionIcon(healthSummary.engineCondition)}
          <div>
            <p className="text-muted-foreground text-xs">Engine</p>
            <p className="font-medium text-card-foreground">
              {getConditionLabel(healthSummary.engineCondition)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg">
          {getConditionIcon(healthSummary.gearCondition)}
          <div>
            <p className="text-muted-foreground text-xs">Gear</p>
            <p className="font-medium text-card-foreground">
              {getConditionLabel(healthSummary.gearCondition)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg">
          <Gauge className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-xs">Mileage</p>
            <p className="font-medium text-card-foreground">
              {healthSummary.mileage.toLocaleString()} {healthSummary.mileageUnit}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground italic">
        ⚠️ Dealer-declared. Verify before purchase.
      </p>
    </div>
  );
};

export default CarHealthCard;
