import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarCard from '@/components/cars/CarCard';
import VerificationBadge from '@/components/dealers/VerificationBadge';
import { 
  getDealerById, 
  getCarsForDealer,
} from '@/lib/mockData';
import { 
  MapPin, 
  Calendar,
  Share2,
  Flag,
  Car,
  Link as LinkIcon,
  Phone,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const DealerProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  const dealer = getDealerById(id || '');
  const originCars = getCarsForDealer(id || '', 'origin');
  const affiliateCars = getCarsForDealer(id || '', 'affiliate');
  
  if (!dealer) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Dealer not found</h1>
          <Link to="/cars">
            <Button>Browse cars</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-NG', {
      month: 'long',
      year: 'numeric'
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I found your profile on AutoChain. I'm interested in your cars.`);
    window.open(`https://wa.me/${dealer.whatsappNumber.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${dealer.phoneNumber}`, '_self');
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-8 sm:py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4 sm:gap-6"
          >
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-accent flex items-center justify-center shadow-lg shrink-0">
              <span className="text-3xl sm:text-4xl font-bold text-accent-foreground">
                {dealer.businessName.charAt(0)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">
                {dealer.businessName}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-primary-foreground/70 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {dealer.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Since {formatDate(dealer.joinedAt)}
                </span>
              </div>
              <VerificationBadge tier={dealer.verificationTier} size="lg" />
              {dealer.bio && (
                <p className="mt-3 text-sm text-primary-foreground/80 max-w-xl">
                  {dealer.bio}
                </p>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex gap-2 shrink-0">
              <Button variant="hero-outline" size="sm" onClick={openWhatsApp}>
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="hero-outline" size="sm" onClick={handleCall}>
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container -mt-4 sm:-mt-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-4 sm:p-6 shadow-card grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent">{dealer.totalCarsPosted}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Cars Posted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary">{dealer.totalCarsAffiliating}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Also Selling</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">{dealer.activityScore}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Activity Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-success">
              {dealer.verificationTier !== 'unverified' ? '✓' : '○'}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {dealer.verificationTier !== 'unverified' ? 'Verified' : 'Pending'}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Inventory Tabs */}
      <section className="container pb-24 sm:pb-8">
        <Tabs defaultValue="origin" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="origin" className="flex items-center gap-1.5 text-sm">
              <Car className="h-4 w-4" />
              Posted ({originCars.length})
            </TabsTrigger>
            <TabsTrigger value="affiliate" className="flex items-center gap-1.5 text-sm">
              <LinkIcon className="h-4 w-4" />
              Also Selling ({affiliateCars.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="origin">
            {originCars.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {originCars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No cars posted yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="affiliate">
            {affiliateCars.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {affiliateCars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Not selling any other cars yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Mobile Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-card border-t border-border p-4 shadow-lg z-40">
        <div className="container flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleCall}>
            <Phone className="h-4 w-4" />
            Call
          </Button>
          <Button variant="accent" className="flex-1" onClick={openWhatsApp}>
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default DealerProfile;
