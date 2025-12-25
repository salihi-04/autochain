// Core types for AutoChain

// Verification tiers for dealers
export type VerificationTier = 'unverified' | 'id_verified' | 'business_verified';

// User types
export type UserType = 'buyer' | 'dealer';

// Car health summary (dealer-declared)
export interface CarHealthSummary {
  accidentHistory: 'none' | 'minor' | 'major';
  engineCondition: 'excellent' | 'good' | 'fair' | 'needs_attention';
  gearCondition: 'excellent' | 'good' | 'fair' | 'needs_attention';
  mileage: number;
  mileageUnit: 'km' | 'miles';
}

// Ordered car images
export interface CarImages {
  front: string;
  back: string;
  interior: string;
  engine: string;
  dashboard: string;
  additional?: string[];
}

export interface Dealer {
  id: string;
  businessName: string;
  location: string;
  state: string;
  whatsappNumber: string;
  phoneNumber: string;
  verificationTier: VerificationTier;
  activityScore: number;
  logoUrl?: string;
  joinedAt: string;
  totalCarsPosted: number;
  totalCarsAffiliating: number;
  bio?: string;
}

export interface Car {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number | null;
  priceType: 'fixed' | 'negotiable' | 'contact';
  healthPercent: number;
  healthSummary: CarHealthSummary;
  faults: string;
  inspectionLocation: string;
  inspectionType: 'on-site' | 'movable' | 'negotiable';
  images: CarImages;
  originDealerId: string;
  status: 'available' | 'negotiating' | 'sold';
  createdAt: string;
  views: number;
}

export interface CarDealer {
  carId: string;
  dealerId: string;
  role: 'origin' | 'affiliate';
  attachedAt: string;
}

// Vault item for dealers to save car details privately
export interface VaultItem {
  id: string;
  dealerId: string;
  make: string;
  model: string;
  year: number;
  price: number | null;
  senderName: string;
  senderPhone: string;
  notes: string;
  createdAt: string;
  images?: string[];
}

// Auth state types
export interface AuthState {
  isAuthenticated: boolean;
  userType: UserType | null;
  userId: string | null;
  phone: string | null;
}
