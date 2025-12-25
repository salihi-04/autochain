// Mock data for the car marketplace
import type { Dealer, Car, CarDealer, VaultItem, VerificationTier, CarHealthSummary, CarImages } from './types';

export type { Dealer, Car, CarDealer, VaultItem };

export const dealers: Dealer[] = [
  {
    id: 'd1',
    businessName: 'AutoKing Motors',
    location: 'Ikeja, Lagos',
    state: 'Lagos',
    whatsappNumber: '+2348012345678',
    phoneNumber: '+2348012345678',
    verificationTier: 'business_verified',
    activityScore: 156,
    joinedAt: '2023-06-15',
    totalCarsPosted: 45,
    totalCarsAffiliating: 12,
    bio: 'Premium car dealer with 10+ years experience. Specializing in Toyota, Honda, and luxury vehicles.',
  },
  {
    id: 'd2',
    businessName: 'Prime Auto Hub',
    location: 'Lekki, Lagos',
    state: 'Lagos',
    whatsappNumber: '+2348098765432',
    phoneNumber: '+2348098765432',
    verificationTier: 'id_verified',
    activityScore: 98,
    joinedAt: '2023-09-20',
    totalCarsPosted: 28,
    totalCarsAffiliating: 8,
    bio: 'Your trusted source for quality pre-owned vehicles in Lekki.',
  },
  {
    id: 'd3',
    businessName: 'Royal Wheels Ltd',
    location: 'Wuse, Abuja',
    state: 'FCT',
    whatsappNumber: '+2349011223344',
    phoneNumber: '+2349011223344',
    verificationTier: 'unverified',
    activityScore: 45,
    joinedAt: '2024-01-10',
    totalCarsPosted: 12,
    totalCarsAffiliating: 3,
  },
  {
    id: 'd4',
    businessName: 'Victory Autos',
    location: 'Ring Road, Ibadan',
    state: 'Oyo',
    whatsappNumber: '+2348055667788',
    phoneNumber: '+2348055667788',
    verificationTier: 'business_verified',
    activityScore: 78,
    joinedAt: '2023-11-05',
    totalCarsPosted: 22,
    totalCarsAffiliating: 15,
    bio: 'Ibadan\'s most trusted car dealership since 2015.',
  },
];

const createCarImages = (img1: string, img2: string): CarImages => ({
  front: img1,
  back: img2,
  interior: img1,
  engine: img2,
  dashboard: img1,
});

export const cars: Car[] = [
  {
    id: 'c1',
    vin: 'WVWZZZ3CZWE123456',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 12500000,
    priceType: 'negotiable',
    healthPercent: 85,
    healthSummary: {
      accidentHistory: 'none',
      engineCondition: 'good',
      gearCondition: 'excellent',
      mileage: 45000,
      mileageUnit: 'km',
    },
    faults: 'Minor scratch on rear bumper, AC needs servicing',
    inspectionLocation: 'Berger, Ikeja',
    inspectionType: 'on-site',
    images: createCarImages(
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
    ),
    originDealerId: 'd1',
    status: 'available',
    createdAt: '2024-01-15',
    views: 234,
  },
  {
    id: 'c2',
    vin: 'WDBRF61J21F123789',
    make: 'Mercedes-Benz',
    model: 'C300',
    year: 2019,
    price: 18000000,
    priceType: 'fixed',
    healthPercent: 92,
    healthSummary: {
      accidentHistory: 'none',
      engineCondition: 'excellent',
      gearCondition: 'excellent',
      mileage: 28000,
      mileageUnit: 'km',
    },
    faults: 'Excellent condition, full service history',
    inspectionLocation: 'Lekki Phase 1',
    inspectionType: 'movable',
    images: createCarImages(
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80'
    ),
    originDealerId: 'd2',
    status: 'available',
    createdAt: '2024-01-18',
    views: 456,
  },
  {
    id: 'c3',
    vin: '5UXWX7C5XBL123654',
    make: 'BMW',
    model: 'X5',
    year: 2021,
    price: null,
    priceType: 'contact',
    healthPercent: 78,
    healthSummary: {
      accidentHistory: 'minor',
      engineCondition: 'good',
      gearCondition: 'fair',
      mileage: 52000,
      mileageUnit: 'km',
    },
    faults: 'Front suspension needs attention, minor dent on driver door',
    inspectionLocation: 'Garki, Abuja',
    inspectionType: 'negotiable',
    images: createCarImages(
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'
    ),
    originDealerId: 'd3',
    status: 'negotiating',
    createdAt: '2024-01-20',
    views: 189,
  },
  {
    id: 'c4',
    vin: '1HGBH41JXMN109186',
    make: 'Honda',
    model: 'Accord',
    year: 2022,
    price: 15500000,
    priceType: 'negotiable',
    healthPercent: 95,
    healthSummary: {
      accidentHistory: 'none',
      engineCondition: 'excellent',
      gearCondition: 'excellent',
      mileage: 12000,
      mileageUnit: 'km',
    },
    faults: 'Like new, 12,000km mileage only',
    inspectionLocation: 'Victoria Island, Lagos',
    inspectionType: 'on-site',
    images: createCarImages(
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'
    ),
    originDealerId: 'd1',
    status: 'available',
    createdAt: '2024-01-22',
    views: 312,
  },
  {
    id: 'c5',
    vin: 'JTDKN3DU5A0123987',
    make: 'Lexus',
    model: 'RX350',
    year: 2018,
    price: 22000000,
    priceType: 'fixed',
    healthPercent: 68,
    healthSummary: {
      accidentHistory: 'none',
      engineCondition: 'fair',
      gearCondition: 'good',
      mileage: 89000,
      mileageUnit: 'km',
    },
    faults: 'Engine needs tune-up, rear brake pads worn, AC compressor weak',
    inspectionLocation: 'Ring Road, Ibadan',
    inspectionType: 'movable',
    images: createCarImages(
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80'
    ),
    originDealerId: 'd4',
    status: 'available',
    createdAt: '2024-01-25',
    views: 145,
  },
  {
    id: 'c6',
    vin: 'WVWZZZ3CZWE789012',
    make: 'Volkswagen',
    model: 'Passat',
    year: 2019,
    price: 9800000,
    priceType: 'negotiable',
    healthPercent: 42,
    healthSummary: {
      accidentHistory: 'major',
      engineCondition: 'needs_attention',
      gearCondition: 'fair',
      mileage: 120000,
      mileageUnit: 'km',
    },
    faults: 'Transmission issues, needs new tires, AC not working, electrical faults',
    inspectionLocation: 'Maryland, Lagos',
    inspectionType: 'on-site',
    images: createCarImages(
      'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80'
    ),
    originDealerId: 'd2',
    status: 'available',
    createdAt: '2024-01-28',
    views: 87,
  },
];

export const carDealers: CarDealer[] = [
  { carId: 'c1', dealerId: 'd1', role: 'origin', attachedAt: '2024-01-15' },
  { carId: 'c1', dealerId: 'd2', role: 'affiliate', attachedAt: '2024-01-17' },
  { carId: 'c1', dealerId: 'd4', role: 'affiliate', attachedAt: '2024-01-19' },
  { carId: 'c2', dealerId: 'd2', role: 'origin', attachedAt: '2024-01-18' },
  { carId: 'c2', dealerId: 'd1', role: 'affiliate', attachedAt: '2024-01-20' },
  { carId: 'c3', dealerId: 'd3', role: 'origin', attachedAt: '2024-01-20' },
  { carId: 'c4', dealerId: 'd1', role: 'origin', attachedAt: '2024-01-22' },
  { carId: 'c4', dealerId: 'd3', role: 'affiliate', attachedAt: '2024-01-24' },
  { carId: 'c5', dealerId: 'd4', role: 'origin', attachedAt: '2024-01-25' },
  { carId: 'c6', dealerId: 'd2', role: 'origin', attachedAt: '2024-01-28' },
];

// Mock vault items for dealers
export const vaultItems: VaultItem[] = [
  {
    id: 'v1',
    dealerId: 'd1',
    make: 'Toyota',
    model: 'Highlander',
    year: 2019,
    price: 14000000,
    senderName: 'John Obi',
    senderPhone: '+2348033445566',
    notes: 'Clean title, owner relocating. Needs quick sale.',
    createdAt: '2024-01-20',
  },
];

// Helper functions
export const getDealerById = (id: string): Dealer | undefined => 
  dealers.find(d => d.id === id);

export const getCarById = (id: string): Car | undefined => 
  cars.find(c => c.id === id);

export const getDealersForCar = (carId: string): (Dealer & { role: 'origin' | 'affiliate' })[] => {
  const relations = carDealers.filter(cd => cd.carId === carId);
  return relations
    .map(rel => {
      const dealer = getDealerById(rel.dealerId);
      if (!dealer) return null;
      return { ...dealer, role: rel.role };
    })
    .filter(Boolean) as (Dealer & { role: 'origin' | 'affiliate' })[];
};

export const getCarsForDealer = (dealerId: string, role?: 'origin' | 'affiliate'): Car[] => {
  const relations = carDealers.filter(cd => 
    cd.dealerId === dealerId && (!role || cd.role === role)
  );
  return relations
    .map(rel => getCarById(rel.carId))
    .filter(Boolean) as Car[];
};

export const formatPrice = (price: number | null, priceType: string): string => {
  if (priceType === 'contact' || price === null) return 'Contact for Price';
  const formatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return priceType === 'negotiable' ? `${formatted} (Negotiable)` : formatted;
};

export const getHealthColor = (percent: number): string => {
  if (percent < 50) return 'health-critical';
  if (percent < 80) return 'health-warning';
  return 'health-good';
};

export const getHealthBgColor = (percent: number): string => {
  if (percent < 50) return 'bg-health-critical';
  if (percent < 80) return 'bg-health-warning';
  return 'bg-health-good';
};

export const getVerificationLabel = (tier: VerificationTier): string => {
  switch (tier) {
    case 'business_verified': return 'Business Verified';
    case 'id_verified': return 'ID Verified';
    default: return 'Unverified';
  }
};

export const getVerificationColor = (tier: VerificationTier): string => {
  switch (tier) {
    case 'business_verified': return 'text-success';
    case 'id_verified': return 'text-primary';
    default: return 'text-muted-foreground';
  }
};
