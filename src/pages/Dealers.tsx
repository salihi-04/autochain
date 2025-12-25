import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { dealers } from '@/lib/mockData';
import VerificationBadge from '@/components/dealers/VerificationBadge';
import { Search, MapPin, Car, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Dealers = () => {
  const [search, setSearch] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = dealer.businessName.toLowerCase().includes(search.toLowerCase()) ||
                          dealer.location.toLowerCase().includes(search.toLowerCase());
    const matchesVerified = !verifiedOnly || dealer.verificationTier !== 'unverified';
    return matchesSearch && matchesVerified;
  });

  return (
    <Layout>
      <div className="container py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dealers</h1>
          <p className="text-sm text-muted-foreground">
            Browse our network of trusted car dealers
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dealers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
          <Button
            variant={verifiedOnly ? 'accent' : 'outline'}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className="shrink-0"
          >
            <Shield className="h-4 w-4" />
            Verified Only
          </Button>
        </div>

        {/* Dealers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDealers.map((dealer, index) => (
            <motion.div
              key={dealer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/dealers/${dealer.id}`}>
                <article className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all active:scale-[0.98]">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {dealer.logoUrl ? (
                        <img 
                          src={dealer.logoUrl} 
                          alt={dealer.businessName}
                          className="h-full w-full object-cover rounded-xl"
                        />
                      ) : (
                        <Car className="h-6 w-6 text-primary" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-card-foreground truncate">
                        {dealer.businessName}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{dealer.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <VerificationBadge 
                      tier={dealer.verificationTier} 
                      size="sm"
                    />
                    <span className="text-xs text-muted-foreground">
                      {dealer.totalCarsPosted} cars
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredDealers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No dealers found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dealers;
