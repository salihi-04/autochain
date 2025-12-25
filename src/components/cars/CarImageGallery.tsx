import type { CarImages } from '@/lib/types';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CarImageGalleryProps {
  images: CarImages;
  carName: string;
  className?: string;
}

const imageLabels: Record<keyof Omit<CarImages, 'additional'>, string> = {
  front: 'Front',
  back: 'Back',
  interior: 'Interior',
  engine: 'Engine',
  dashboard: 'Dashboard',
};

const CarImageGallery = ({ images, carName, className }: CarImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Convert images object to array
  const imageEntries = Object.entries(imageLabels).map(([key, label]) => ({
    key: key as keyof Omit<CarImages, 'additional'>,
    label,
    url: images[key as keyof Omit<CarImages, 'additional'>],
  }));

  // Add additional images if present
  if (images.additional?.length) {
    images.additional.forEach((url, i) => {
      imageEntries.push({
        key: `additional_${i}` as any,
        label: `Photo ${i + 1}`,
        url,
      });
    });
  }

  const currentImage = imageEntries[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageEntries.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageEntries.length) % imageEntries.length);
  };

  return (
    <div className={cn("relative bg-card rounded-xl overflow-hidden", className)}>
      {/* Main Image */}
      <div className="aspect-[4/3] sm:aspect-[16/10] relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={currentImage.url}
            alt={`${carName} - ${currentImage.label}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {/* Image Label */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium">
          <Camera className="h-3.5 w-3.5" />
          {currentImage.label}
        </div>

        {/* Navigation Arrows */}
        {imageEntries.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
          {currentIndex + 1} / {imageEntries.length}
        </div>
      </div>

      {/* Thumbnails - horizontal scroll on mobile */}
      <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
        {imageEntries.map((img, i) => (
          <button
            key={img.key}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all",
              i === currentIndex
                ? "ring-2 ring-accent ring-offset-2 ring-offset-card"
                : "opacity-60 hover:opacity-100"
            )}
          >
            <img
              src={img.url}
              alt={img.label}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarImageGallery;
