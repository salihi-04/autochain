import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CarImageGallery from '@/components/cars/CarImageGallery';
import CarHealthCard from '@/components/cars/CarHealthCard';
import VerificationBadge from '@/components/dealers/VerificationBadge';
import { 
  getCarById, 
  getDealersForCar, 
  formatPrice 
} from '@/lib/mockData';
import { 
  ChevronLeft, 
  MapPin, 
  Phone, 
  Calendar,
  Share2,
  Flag,
  Eye,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const car = getCarById(id || '');
  const dealers = getDealersForCar(id || '');
  
  if (!car) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Car not found</h1>
          <Link to="/cars">
            <Button>Back to listings</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const originDealer = dealers.find(d => d.role === 'origin');
  const affiliateDealers = dealers.filter(d => d.role === 'affiliate');

  const openWhatsApp = (phone: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.make} ${car.model} listed on AutoChain.`);
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen pb-24 lg:pb-8">
        {/* Back Button */}
        <div className="container pt-4 pb-2">
          <Link to="/cars">
            <Button variant="ghost" size="sm" className="gap-1 -ml-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CarImageGallery 
                  images={car.images} 
                  carName={`${car.make} ${car.model}`}
                  className="shadow-card"
                />
              </motion.div>

              {/* Car Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl p-4 sm:p-6 shadow-card space-y-4"
              >
                {/* Status & Views */}
                <div className="flex items-center justify-between">
                  {car.status === 'available' && (
                    <Badge className="bg-success text-success-foreground">Available</Badge>
                  )}
                  {car.status === 'negotiating' && (
                    <Badge className="bg-warning text-warning-foreground">In Negotiation</Badge>
                  )}
                  {car.status === 'sold' && (
                    <Badge className="bg-muted text-muted-foreground">Sold</Badge>
                  )}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {car.views} views
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-card-foreground">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {car.inspectionLocation}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-2xl sm:text-3xl font-bold text-accent">
                  {formatPrice(car.price, car.priceType)}
                </div>

                {/* Health Summary */}
                <CarHealthCard 
                  healthSummary={car.healthSummary}
                  healthPercent={car.healthPercent}
                />

                {/* Inspection */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                    <p className="font-medium text-sm text-card-foreground">{car.inspectionLocation}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-0.5">Inspection</p>
                    <p className="font-medium text-sm text-card-foreground capitalize">{car.inspectionType.replace('-', ' ')}</p>
                  </div>
                </div>

                {/* VIN */}
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-0.5">VIN</p>
                  <p className="font-mono font-medium text-sm text-card-foreground">{car.vin}</p>
                </div>

                {/* Known Issues */}
                {car.faults && (
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <p className="text-xs text-warning mb-1 font-medium">Known Issues</p>
                    <p className="text-sm text-card-foreground">{car.faults}</p>
                  </div>
                )}
              </motion.div>

              {/* The Chain Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl p-4 sm:p-6 shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-card-foreground">Dealers Selling This</h2>
                  <Link to={`/cars/${car.id}/affiliates`}>
                    <Button variant="ghost" size="sm" className="text-accent">
                      View All
                    </Button>
                  </Link>
                </div>
                
                {/* Origin Dealer */}
                {originDealer && (
                  <div className="mb-4">
                    <Link to={`/dealers/${originDealer.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-bold text-primary">
                              {originDealer.businessName.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-card-foreground truncate">
                                {originDealer.businessName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <VerificationBadge tier={originDealer.verificationTier} size="sm" />
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-primary text-primary-foreground shrink-0">Origin</Badge>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Affiliate Dealers */}
                {affiliateDealers.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Also available through</p>
                    {affiliateDealers.slice(0, 2).map(dealer => (
                      <Link key={dealer.id} to={`/dealers/${dealer.id}`}>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                              <span className="text-sm font-bold text-accent">
                                {dealer.businessName.charAt(0)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <span className="font-medium text-sm text-card-foreground truncate block">
                                {dealer.businessName}
                              </span>
                              <VerificationBadge tier={dealer.verificationTier} size="sm" showLabel={false} />
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0">Affiliate</Badge>
                        </div>
                      </Link>
                    ))}
                    {affiliateDealers.length > 2 && (
                      <Link to={`/cars/${car.id}/affiliates`}>
                        <p className="text-sm text-accent text-center py-2">
                          +{affiliateDealers.length - 2} more dealers
                        </p>
                      </Link>
                    )}
                  </div>
                )}

                {/* Attach as Affiliate CTA */}
                <div className="mt-4 pt-4 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">Are you a dealer?</p>
                  <Link to={`/cars/${car.id}/affiliates`}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Attach as Affiliate
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Fixed Bottom CTA */}
        {originDealer && (
          <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-card border-t border-border p-4 shadow-lg z-40">
            <div className="container flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleCall(originDealer.phoneNumber)}
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button 
                variant="accent" 
                className="flex-1"
                onClick={() => openWhatsApp(originDealer.whatsappNumber)}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CarDetail;
