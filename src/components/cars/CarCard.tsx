import { Link } from 'react-router-dom';
import { Car, formatPrice, getDealerById } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import HealthBadge from './HealthBadge';
import VerificationBadge from '@/components/dealers/VerificationBadge';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarCardProps {
  car: Car;
  index?: number;
}

const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const originDealer = getDealerById(car.originDealerId);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/cars/${car.id}`}>
        <article className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 active:scale-[0.98]">
          {/* Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
            <img 
              src={car.images.front} 
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-2 left-2 flex gap-1.5">
              {car.status === 'available' && (
                <Badge variant="default" className="bg-success text-success-foreground text-xs">
                  Available
                </Badge>
              )}
              {car.status === 'negotiating' && (
                <Badge variant="default" className="bg-warning text-warning-foreground text-xs">
                  In Talks
                </Badge>
              )}
            </div>
            <div className="absolute bottom-2 right-2">
              <HealthBadge percent={car.healthPercent} size="sm" />
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 space-y-2">
            {/* Title & Year */}
            <div>
              <h3 className="font-bold text-base sm:text-lg text-card-foreground group-hover:text-accent transition-colors line-clamp-1">
                {car.year} {car.make} {car.model}
              </h3>
            </div>

            {/* Price */}
            <p className="text-lg sm:text-xl font-bold text-accent">
              {formatPrice(car.price, car.priceType)}
            </p>

            {/* Dealer */}
            {originDealer && (
              <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground min-w-0">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{originDealer.location}</span>
                </div>
                <VerificationBadge 
                  tier={originDealer.verificationTier} 
                  size="sm" 
                  showLabel={false} 
                />
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default CarCard;
