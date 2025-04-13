
import { BookingFormData } from "@/types/booking-types";
import { calculateQuote, formatCurrency } from "@/utils/quote-calculator";
import { ADD_ONS, PACKAGES } from "@/data/booking-constants";
import { format } from "date-fns";

interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export const sendOwnerEmail = (formData: BookingFormData): Promise<boolean> => {
  const quote = calculateQuote(formData);
  if (!quote || !formData.eventDate) return Promise.resolve(false);
  
  const selectedPackage = PACKAGES.find(pkg => pkg.id === formData.selectedPackage);
  if (!selectedPackage) return Promise.resolve(false);
  
  const selectedAddOns = ADD_ONS.filter(addon => formData.addOns.includes(addon.id));
  const addOnsList = selectedAddOns.map(addon => `- ${addon.name}: ${formatCurrency(addon.price)}`).join('\n');
  
  const payload: EmailPayload = {
    to: 'bookings@theknightlyphotobooth.com',
    subject: `New Booking Enquiry from ${formData.name}`,
    body: `
New booking enquiry details:

Name: ${formData.name}
Email: ${formData.emailAddress}
Event Type: ${formData.eventType}
Event Date: ${format(formData.eventDate, 'PPP')}

Selected Package: ${selectedPackage.name} (${formatCurrency(selectedPackage.price)})
Extra Hours: ${formData.extraHours} (${formatCurrency(formData.extraHours * 99)})

Add-Ons:
${addOnsList || 'None selected'}

Total Quote: ${formatCurrency(quote.finalTotal)}
`
  };
  
  // In a real application, this would be an API call to your backend
  console.log('Sending owner email:', payload);
  
  // Return a mock promise that resolves to true after a delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
};

export const sendClientEmail = (formData: BookingFormData): Promise<boolean> => {
  const quote = calculateQuote(formData);
  if (!quote || !formData.eventDate) return Promise.resolve(false);
  
  const selectedPackage = PACKAGES.find(pkg => pkg.id === formData.selectedPackage);
  if (!selectedPackage) return Promise.resolve(false);
  
  const selectedAddOns = ADD_ONS.filter(addon => formData.addOns.includes(addon.id));
  const addOnsList = selectedAddOns.length > 0 
    ? selectedAddOns.map(addon => addon.name).join(', ')
    : 'None';
  
  const payload: EmailPayload = {
    to: formData.emailAddress,
    subject: 'Thanks for your booking enquiry!',
    body: `
Hi ${formData.name},

Thank you for submitting your booking enquiry for your ${formData.eventType} on ${format(formData.eventDate, 'PPP')}.

Here's a summary of your request:
Package: ${selectedPackage.name}
Extra Hours: ${formData.extraHours}
Add-Ons: ${addOnsList}
Estimated Total Quote: ${formatCurrency(quote.finalTotal)}

We'll be in touch soon to confirm everything!

– The Knightly Photobooth Team
`
  };
  
  // In a real application, this would be an API call to your backend
  console.log('Sending client email:', payload);
  
  // Return a mock promise that resolves to true after a delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 800);
  });
};

// In a real implementation, this would connect to Supabase or another database
export const saveBookingEnquiry = (formData: BookingFormData): Promise<boolean> => {
  const quote = calculateQuote(formData);
  
  // Data to be saved to the database
  const enquiryData = {
    ...formData,
    eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : null,
    quoteDetails: quote,
    createdAt: new Date().toISOString()
  };
  
  // In a real application, this would be an API call to your backend
  console.log('Saving booking enquiry:', enquiryData);
  
  // Return a mock promise that resolves to true after a delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 600);
  });
};
