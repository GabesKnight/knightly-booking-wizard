
import { ADD_ONS, PACKAGES } from "@/data/booking-constants";
import { BookingFormData, QuoteSummary } from "@/types/booking-types";

export const formatCurrency = (amount: number, showCents: boolean = true): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount);
};

export const calculateQuote = (formData: BookingFormData): QuoteSummary | null => {
  if (!formData.selectedPackage) return null;

  // Find selected package
  const selectedPackage = PACKAGES.find(pkg => pkg.id === formData.selectedPackage);
  if (!selectedPackage) return null;

  // Calculate extra hours cost
  const extraHoursCount = formData.extraHours || 0;
  const extraHoursPrice = extraHoursCount * 99;

  // Calculate add-ons
  const selectedAddOns = formData.addOns || [];
  const addOnsDetails = selectedAddOns.map(addonId => {
    const addon = ADD_ONS.find(a => a.id === addonId);
    return {
      name: addon?.name || '',
      price: addon?.price || 0
    };
  });

  // Calculate add-ons total
  const addOnsTotal = addOnsDetails.reduce((sum, addon) => sum + addon.price, 0);

  // Calculate discount based on number of add-ons
  let discountPercentage = 0;
  if (selectedAddOns.length >= 4) {
    discountPercentage = 0.2; // 20% discount
  } else if (selectedAddOns.length === 3) {
    discountPercentage = 0.15; // 15% discount
  } else if (selectedAddOns.length === 2) {
    discountPercentage = 0.1; // 10% discount
  }

  const addOnsDiscount = addOnsTotal * discountPercentage;

  // Calculate final total
  const finalTotal = selectedPackage.price + extraHoursPrice + addOnsTotal - addOnsDiscount;

  return {
    packageName: selectedPackage.name,
    packagePrice: selectedPackage.price,
    extraHoursCount,
    extraHoursPrice,
    addOns: addOnsDetails,
    addOnsTotal,
    addOnsDiscount,
    finalTotal
  };
};
