
import { BookingFormData } from "@/types/booking-types";
import { calculateQuote, formatCurrency } from "@/utils/quote-calculator";
import { ADD_ONS, PACKAGES } from "@/data/booking-constants";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

// Function to send API request for emails using Supabase Edge Function
const sendEmailRequest = async (payload: EmailPayload): Promise<boolean> => {
  try {
    console.log('Sending email:', payload);
    
    // Call the Supabase Edge Function to send the email
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: payload
    });
    
    if (error) {
      console.error('Error invoking send-email function:', error);
      return false;
    }
    
    console.log('Email function response:', data);
    return data?.success || true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendOwnerEmail = async (formData: BookingFormData): Promise<boolean> => {
  const quote = calculateQuote(formData);
  if (!quote || !formData.eventDate) return false;
  
  const selectedPackage = PACKAGES.find(pkg => pkg.id === formData.selectedPackage);
  if (!selectedPackage) return false;
  
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
Base Hours: ${quote.baseHours}
Extra Hours: ${formData.extraHours} (${formatCurrency(formData.extraHours * 99)})

Add-Ons:
${addOnsList || 'None selected'}

Total Quote: ${formatCurrency(quote.finalTotal)}
`
  };
  
  console.log('Sending owner email:', payload);
  
  // Use the sendEmailRequest function to actually send the email
  return await sendEmailRequest(payload);
};

export const sendClientEmail = async (formData: BookingFormData): Promise<boolean> => {
  const quote = calculateQuote(formData);
  if (!quote || !formData.eventDate) return false;
  
  const selectedPackage = PACKAGES.find(pkg => pkg.id === formData.selectedPackage);
  if (!selectedPackage) return false;
  
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
Base Hours: ${quote.baseHours}
Extra Hours: ${formData.extraHours}
Add-Ons: ${addOnsList}
Estimated Total Quote: ${formatCurrency(quote.finalTotal)}

We'll be in touch soon to confirm everything!

– The Knightly Photobooth Team
`
  };
  
  console.log('Sending client email:', payload);
  
  // Use the sendEmailRequest function to actually send the email
  return await sendEmailRequest(payload);
};

export const saveBookingEnquiry = async (formData: BookingFormData): Promise<boolean> => {
  const quote = calculateQuote(formData);
  
  // Data to be saved to the database
  const enquiryData = {
    ...formData,
    eventDate: formData.eventDate ? format(formData.eventDate, 'yyyy-MM-dd') : null,
    quoteDetails: quote,
    createdAt: new Date().toISOString()
  };
  
  console.log('Saving booking enquiry:', enquiryData);
  
  try {
    // In a real application, this would be an API call to your backend
    // For demonstration purposes, we're using a timeout to simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    return true;
  } catch (error) {
    console.error('Error saving booking enquiry:', error);
    return false;
  }
};
