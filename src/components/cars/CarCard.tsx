import { Link } from 'react-router-dom';
import { Car, formatPrice, getDealerById } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import HealthBadge from './HealthBadge';
import { MapPin, CheckCircle2 } from 'lucide-react';
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
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link to={`/cars/${car.id}`}>
        <article className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img 
              src={car.images[0]} 
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              {car.status === 'available' && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  Available
                </Badge>
              )}
              {car.status === 'negotiating' && (
                <Badge variant="default" className="bg-warning text-warning-foreground">
                  In Negotiation
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title & Year */}
            <div>
              <h3 className="font-bold text-lg text-card-foreground group-hover:text-accent transition-colors">
                {car.make} {car.model}
              </h3>
              <p className="text-sm text-muted-foreground">{car.year}</p>
            </div>

            {/* Price */}
            <p className="text-xl font-bold text-accent">
              {formatPrice(car.price, car.priceType)}
            </p>

            {/* Health */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Health</span>
              <HealthBadge percent={car.healthPercent} size="sm" />
            </div>

            {/* Dealer */}
            {originDealer && (
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{originDealer.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-medium text-card-foreground">{originDealer.businessName}</span>
                  {originDealer.isVerified && (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default CarCard;
