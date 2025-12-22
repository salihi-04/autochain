import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { dealers } from '@/lib/mockData';
import DealerBadge from '@/components/dealers/DealerBadge';
import { Search, MapPin, Car, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Dealers = () => {
  const [search, setSearch] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = dealer.businessName.toLowerCase().includes(search.toLowerCase()) ||
                          dealer.location.toLowerCase().includes(search.toLowerCase());
    const matchesVerified = !verifiedOnly || dealer.isVerified;
    return matchesSearch && matchesVerified;
  });

  return (
    <Layout>
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Verified Dealers</h1>
          <p className="text-muted-foreground">
            Browse our network of trusted car dealers
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={verifiedOnly ? 'accent' : 'outline'}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
          >
            <CheckCircle2 className="h-4 w-4" />
            Verified Only
          </Button>
        </div>

        {/* Dealers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer, index) => (
            <motion.div
              key={dealer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/dealers/${dealer.id}`}>
                <article className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {dealer.logoUrl ? (
                        <img 
                          src={dealer.logoUrl} 
                          alt={dealer.businessName}
                          className="h-full w-full object-cover rounded-xl"
                        />
                      ) : (
                        <Car className="h-7 w-7 text-primary" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-card-foreground truncate">
                          {dealer.businessName}
                        </h3>
                        {dealer.isVerified && (
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{dealer.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <DealerBadge 
                      isVerified={dealer.isVerified} 
                      activityScore={dealer.activityScore} 
                    />
                    <span className="text-xs text-muted-foreground">
                      Since {new Date(dealer.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
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
