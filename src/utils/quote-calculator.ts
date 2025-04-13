
import { ADD_ON_DISCOUNT_TIERS, ADD_ONS, EXTRA_HOURS_PRICE, PACKAGES } from "@/data/booking-constants";
import { BookingFormData, QuoteSummary } from "@/types/booking-types";

export function calculateQuote(formData: BookingFormData): QuoteSummary | null {
  if (!formData.selectedPackage) {
    return null;
  }

  // Find the selected package
  const selectedPackage = PACKAGES.find(pkg => pkg.id === formData.selectedPackage);
  if (!selectedPackage) {
    return null;
  }

  // Calculate extra hours cost
  const extraHoursCount = formData.extraHours;
  const extraHoursPrice = extraHoursCount * EXTRA_HOURS_PRICE;

  // Calculate add-ons
  const selectedAddOns = ADD_ONS.filter(addon => formData.addOns.includes(addon.id));
  const addOnsDetails = selectedAddOns.map(addon => ({
    name: addon.name,
    price: addon.price
  }));
  
  const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);

  // Calculate add-on discounts
  let addOnsDiscount = 0;
  const addOnCount = selectedAddOns.length;

  // Find the highest applicable discount tier
  for (let i = ADD_ON_DISCOUNT_TIERS.length - 1; i >= 0; i--) {
    if (addOnCount >= ADD_ON_DISCOUNT_TIERS[i].count) {
      addOnsDiscount = addOnsTotal * ADD_ON_DISCOUNT_TIERS[i].discount;
      break;
    }
  }

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
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
