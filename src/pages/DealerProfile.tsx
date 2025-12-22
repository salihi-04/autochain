import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarCard from '@/components/cars/CarCard';
import DealerBadge from '@/components/dealers/DealerBadge';
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
  Link as LinkIcon
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

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-accent flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-accent-foreground">
                {dealer.businessName.charAt(0)}
              </span>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-primary-foreground mb-2">
                {dealer.businessName}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-primary-foreground/70 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {dealer.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Active since {formatDate(dealer.joinedAt)}
                </span>
              </div>
              <DealerBadge 
                isVerified={dealer.isVerified} 
                activityScore={dealer.activityScore}
                size="lg"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="hero-outline" size="sm">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="hero-outline" size="sm">
                <Flag className="h-4 w-4" />
                Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container -mt-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-card grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{dealer.totalCarsPosted}</div>
            <div className="text-sm text-muted-foreground">Cars Posted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{dealer.totalCarsAffiliating}</div>
            <div className="text-sm text-muted-foreground">Also Selling</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{dealer.activityScore}</div>
            <div className="text-sm text-muted-foreground">Activity Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success">
              {dealer.isVerified ? '✓' : '○'}
            </div>
            <div className="text-sm text-muted-foreground">
              {dealer.isVerified ? 'Verified' : 'Pending'}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Inventory Tabs */}
      <section className="container pb-20">
        <Tabs defaultValue="origin" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
            <TabsTrigger value="origin" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Origin Listings ({originCars.length})
            </TabsTrigger>
            <TabsTrigger value="affiliate" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Also Selling ({affiliateCars.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="origin">
            {originCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </Layout>
  );
};

export default DealerProfile;
