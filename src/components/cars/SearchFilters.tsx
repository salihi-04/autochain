import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  minPrice: number | null;
  maxPrice: number | null;
  minHealth: number | null;
  verifiedOnly: boolean;
  location: string;
}

const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: null,
    maxPrice: null,
    minHealth: null,
    verifiedOnly: false,
    location: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared: FilterState = {
      minPrice: null,
      maxPrice: null,
      minHealth: null,
      verifiedOnly: false,
      location: '',
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const activeFilterCount = [
    filters.minPrice,
    filters.maxPrice,
    filters.minHealth,
    filters.verifiedOnly,
    filters.location,
  ].filter(Boolean).length;

  return (
    <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by Make, Model, or VIN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="accent">
          Search
        </Button>
        <Button 
          type="button" 
          variant={showFilters ? 'secondary' : 'outline'}
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Filters</span>
          {activeFilterCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </form>

      {/* Expanded Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price Range (₦)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : null)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : null)}
                  />
                </div>
              </div>

              {/* Health % */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Minimum Health %</label>
                <Input
                  type="number"
                  placeholder="e.g., 70"
                  min={0}
                  max={100}
                  value={filters.minHealth || ''}
                  onChange={(e) => updateFilter('minHealth', e.target.value ? Number(e.target.value) : null)}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <Input
                  type="text"
                  placeholder="e.g., Lagos"
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                />
              </div>

              {/* Verified Only */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Dealer Type</label>
                <Button
                  type="button"
                  variant={filters.verifiedOnly ? 'accent' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => updateFilter('verifiedOnly', !filters.verifiedOnly)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Verified Dealers Only
                </Button>
              </div>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <div className="pt-4 flex justify-end">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear all filters
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchFilters;
