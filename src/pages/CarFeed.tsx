import { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import CarCard from '@/components/cars/CarCard';
import SearchFilters, { FilterState } from '@/components/cars/SearchFilters';
import { cars, getDealerById } from '@/lib/mockData';
import { motion } from 'framer-motion';

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
        if (!dealer?.isVerified) return false;
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
      {/* Page Header */}
      <section className="bg-primary py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-primary-foreground"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Cars</h1>
            <p className="text-primary-foreground/70">
              {filteredCars.length} cars available from verified dealers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container -mt-6 mb-8">
        <SearchFilters 
          onSearch={setSearchQuery}
          onFilterChange={setFilters}
        />
      </section>

      {/* Car Grid */}
      <section className="container pb-20">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground mb-4">No cars found matching your criteria</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default CarFeed;
