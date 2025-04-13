
export type PackageType = 'digital' | 'print' | 'ultimate';

export interface Package {
  id: PackageType;
  name: string;
  price: number;
  minHours: number;
  maxHours: number;
  hours: string;
  features: {
    text: string;
    included: boolean;
    addonId: string | null;
  }[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface BookingFormData {
  name: string;
  eventType: string;
  eventDate: Date | null;
  emailAddress: string;
  selectedPackage: PackageType | null;
  extraHours: number;
  baseHours: number;
  addOns: string[];
}

export interface QuoteSummary {
  packageName: string;
  packagePrice: number;
  baseHours: number;
  extraHoursCount: number;
  extraHoursPrice: number;
  addOns: {
    name: string;
    price: number;
  }[];
  addOnsTotal: number;
  addOnsDiscount: number;
  finalTotal: number;
}
