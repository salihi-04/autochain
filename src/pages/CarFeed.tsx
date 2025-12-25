import { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import CarCard from '@/components/cars/CarCard';
import SearchFilters, { FilterState } from '@/components/cars/SearchFilters';
import { cars, getDealerById } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { Car, Search } from 'lucide-react';

const CarFeed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    minPrice: null,
    maxPrice: null,
    minHealth: null,
    verifiedOnly: false,
    location: '',
  });

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesMake = car.make.toLowerCase().includes(query);
        const matchesModel = car.model.toLowerCase().includes(query);
        const matchesVin = car.vin.toLowerCase().includes(query);
        if (!matchesMake && !matchesModel && !matchesVin) return false;
      }

      // Price filters
      if (filters.minPrice && car.price && car.price < filters.minPrice) return false;
      if (filters.maxPrice && car.price && car.price > filters.maxPrice) return false;

      // Health filter
      if (filters.minHealth && car.healthPercent < filters.minHealth) return false;

      // Verified dealer filter
      if (filters.verifiedOnly) {
        const dealer = getDealerById(car.originDealerId);
        if (!dealer || dealer.verificationTier === 'unverified') return false;
      }

      // Location filter
      if (filters.location) {
        const dealer = getDealerById(car.originDealerId);
        if (!dealer?.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <Layout>
      {/* Page Header - Mobile optimized */}
      <section className="bg-primary py-6 sm:py-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-primary-foreground"
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Browse Cars</h1>
            <p className="text-sm sm:text-base text-primary-foreground/70">
              {filteredCars.length} cars available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container -mt-4 mb-6">
        <SearchFilters 
          onSearch={setSearchQuery}
          onFilterChange={setFilters}
        />
      </section>

      {/* Car Grid - Mobile first */}
      <section className="container pb-20">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg text-foreground font-medium mb-1">No cars found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default CarFeed;
