import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HealthBadge from '@/components/cars/HealthBadge';
import DealerBadge from '@/components/dealers/DealerBadge';
import { 
  getCarById, 
  getDealersForCar, 
  formatPrice 
} from '@/lib/mockData';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Share2,
  Flag,
  Eye,
  Link as LinkIcon
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const openWhatsApp = (phone: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.make} ${car.model} listed on AutoChain.`);
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen">
        {/* Back Button */}
        <div className="container pt-6">
          <Link to="/cars">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
              Back to listings
            </Button>
          </Link>
        </div>

        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-card rounded-2xl overflow-hidden shadow-card"
              >
                <div className="aspect-[16/10] relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={car.images[currentImageIndex]}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                  
                  {/* Navigation Arrows */}
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Image Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {car.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentImageIndex 
                            ? 'bg-accent w-6' 
                            : 'bg-background/60 hover:bg-background'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {car.status === 'available' && (
                      <Badge className="bg-success text-success-foreground">Available</Badge>
                    )}
                    {car.status === 'negotiating' && (
                      <Badge className="bg-warning text-warning-foreground">In Negotiation</Badge>
                    )}
                    {car.status === 'sold' && (
                      <Badge className="bg-muted text-muted-foreground">Sold</Badge>
                    )}
                  </div>

                  {/* Views */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 rounded-full px-3 py-1 text-sm">
                    <Eye className="h-4 w-4" />
                    {car.views} views
                  </div>
                </div>
              </motion.div>

              {/* Car Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold text-card-foreground">
                    {car.make} {car.model}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {car.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {car.inspectionLocation}
                    </span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-accent">
                  {formatPrice(car.price, car.priceType)}
                </div>

                {/* Health Section */}
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground">Vehicle Health</h3>
                    <HealthBadge percent={car.healthPercent} size="lg" />
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-warning shrink-0" />
                    <p className="text-muted-foreground">{car.faults}</p>
                  </div>
                </div>

                {/* Inspection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Inspection Location</p>
                    <p className="font-medium text-card-foreground">{car.inspectionLocation}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Inspection Type</p>
                    <p className="font-medium text-card-foreground capitalize">{car.inspectionType.replace('-', ' ')}</p>
                  </div>
                </div>

                {/* VIN */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">VIN</p>
                    <p className="font-mono font-medium text-card-foreground">{car.vin}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              {/* The Chain Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <h2 className="text-xl font-bold text-card-foreground mb-6">The Chain</h2>
                
                {/* Origin Dealer */}
                {originDealer && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Posted by</p>
                    <Link to={`/dealers/${originDealer.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">
                              {originDealer.businessName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-card-foreground">
                                {originDealer.businessName}
                              </span>
                              {originDealer.isVerified && (
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{originDealer.location}</p>
                          </div>
                        </div>
                        <Badge className="bg-primary text-primary-foreground">Origin</Badge>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Affiliate Dealers */}
                {affiliateDealers.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Also selling through</p>
                    <div className="space-y-3">
                      {affiliateDealers.map(dealer => (
                        <Link key={dealer.id} to={`/dealers/${dealer.id}`}>
                          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <span className="font-bold text-accent">
                                  {dealer.businessName.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-card-foreground">
                                    {dealer.businessName}
                                  </span>
                                  {dealer.isVerified && (
                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{dealer.location}</p>
                              </div>
                            </div>
                            <Badge variant="outline">Affiliate</Badge>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-card sticky top-24"
              >
                <h3 className="font-bold text-card-foreground mb-4">Contact Dealer</h3>
                
                {originDealer && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {originDealer.businessName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-card-foreground">{originDealer.businessName}</p>
                        <DealerBadge isVerified={originDealer.isVerified} size="sm" />
                      </div>
                    </div>

                    <Button 
                      variant="accent" 
                      className="w-full"
                      onClick={() => openWhatsApp(originDealer.whatsappNumber)}
                    >
                      <Phone className="h-4 w-4" />
                      Contact on WhatsApp
                    </Button>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Flag className="h-4 w-4" />
                        Report
                      </Button>
                    </div>
                  </div>
                )}

                <hr className="my-6 border-border" />

                {/* Affiliate CTA */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Are you a dealer? Sell this car through your network.
                  </p>
                  <Link to="/dealer/signup">
                    <Button variant="secondary" className="w-full">
                      I Can Sell This
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetail;
