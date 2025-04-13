
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Camera, Check, ChevronsUpDown, Wrench, X } from "lucide-react";

import { ADD_ONS, EVENT_TYPES, EXTRA_HOURS_MAX, PACKAGES } from "@/data/booking-constants";
import { BookingFormData, PackageType } from "@/types/booking-types";
import { calculateQuote } from "@/utils/quote-calculator";
import { sendClientEmail, sendOwnerEmail, saveBookingEnquiry } from "@/services/email-service";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import PackageCard from "./PackageCard";
import AddOnSwitch from "./AddOnSwitch";
import QuoteSummary from "./QuoteSummary";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.date({
    required_error: "Please select a date",
  }),
  emailAddress: z.string().email("Please enter a valid email address"),
  selectedPackage: z.enum(['digital', 'print', 'ultimate'], {
    required_error: "Please select a package",
  }),
  baseHours: z.number().min(1).max(4),
  extraHours: z.number().min(0).max(EXTRA_HOURS_MAX),
  addOns: z.array(z.string()),
});

const BookingForm = () => {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      eventType: "",
      eventDate: undefined,
      selectedPackage: undefined,
      baseHours: 1,
      emailAddress: "",
      extraHours: 0,
      addOns: [],
    },
  });

  // Get form values to calculate quote in real-time
  const formValues = form.watch();
  const quote = calculateQuote(formValues as BookingFormData);
  
  // Get the selected package
  const selectedPackage = formValues.selectedPackage ? 
    PACKAGES.find(pkg => pkg.id === formValues.selectedPackage) : null;

  // Update base hours when package changes
  useEffect(() => {
    if (selectedPackage) {
      form.setValue("baseHours", selectedPackage.minHours);
    }
  }, [formValues.selectedPackage, form]);

  // Handle package selection
  const handlePackageSelect = (packageId: PackageType) => {
    const selectedPkg = PACKAGES.find(pkg => pkg.id === packageId);
    
    form.setValue("selectedPackage", packageId);
    
    if (selectedPkg) {
      // Set base hours to the minimum for this package
      form.setValue("baseHours", selectedPkg.minHours);
      
      // Remove add-ons that are included in the package
      const includedAddOnIds = selectedPkg.features
        .filter(f => f.included && f.addonId)
        .map(f => f.addonId) as string[];
      
      // Filter out included add-ons from the current selection
      const filteredAddOns = form.getValues("addOns").filter(
        addonId => !includedAddOnIds.includes(addonId)
      );
      
      form.setValue("addOns", filteredAddOns);
    }
  };

  // Check if an add-on is included in the selected package
  const isAddOnIncluded = (addonId: string): boolean => {
    if (!selectedPackage) return false;
    
    return selectedPackage.features.some(
      feature => feature.addonId === addonId && feature.included
    );
  };

  // Get tooltip text for disabled add-ons
  const getAddOnTooltip = (addonId: string): string | undefined => {
    if (isAddOnIncluded(addonId)) {
      return `Already included in the ${selectedPackage?.name}`;
    }
    return undefined;
  };

  // Handle add-on toggle
  const handleAddOnToggle = (id: string, enabled: boolean) => {
    const currentAddOns = form.getValues("addOns");
    
    if (enabled && !currentAddOns.includes(id)) {
      form.setValue("addOns", [...currentAddOns, id]);
    } else if (!enabled && currentAddOns.includes(id)) {
      form.setValue("addOns", currentAddOns.filter(addonId => addonId !== id));
    }
  };

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    const hours = value[0];
    setSliderValue(hours);
    form.setValue("extraHours", hours);
  };

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setFormSubmitting(true);
      
      // In a real application, you'd send this data to your backend
      console.log("Form data submitted:", data);
      
      // Send emails and save booking enquiry using await with Promise.all
      const [ownerEmailSent, clientEmailSent, bookingSaved] = await Promise.all([
        sendOwnerEmail(data as BookingFormData),
        sendClientEmail(data as BookingFormData),
        saveBookingEnquiry(data as BookingFormData)
      ]);
      
      if (!ownerEmailSent || !clientEmailSent) {
        throw new Error("Failed to send emails");
      }
      
      // Show success message
      toast.success("Booking enquiry submitted successfully!", {
        description: "We'll be in touch with you soon.",
      });
      
      // Reset form
      form.reset();
      setSliderValue(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit booking enquiry", {
        description: "Please try again later.",
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-knightly-green">The Knightly Photobooth</h1>
        <h2 className="text-2xl text-knightly-green mt-2">Interactive Pricing Calculator</h2>
        <p className="text-gray-600 mt-2">Create your custom photobooth package for your special event</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Package Selection */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Camera className="text-knightly-gold" size={24} />
                  <h3 className="text-xl font-semibold text-knightly-green">Select Your Core Package</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PACKAGES.map((pkg) => (
                    <PackageCard 
                      key={pkg.id}
                      packageData={pkg}
                      selected={formValues.selectedPackage === pkg.id}
                      onSelect={handlePackageSelect}
                    />
                  ))}
                </div>
              </div>
              
              {/* Extra Hours Slider */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-knightly-green">Extra Hours</h3>
                <FormField
                  control={form.control}
                  name="extraHours"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Slider
                              min={0}
                              max={EXTRA_HOURS_MAX}
                              step={1}
                              value={[field.value]}
                              onValueChange={handleSliderChange}
                              className="w-[300px]"
                            />
                          </div>
                          <span className="font-semibold text-xl">{field.value}</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          Base package includes {selectedPackage?.minHours || 1}-{selectedPackage?.maxHours || 4} hours. 
                          Extra hours ($99 each) are charged beyond the base hours.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Optional Add-Ons */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Wrench className="text-knightly-gold" size={20} />
                  <h3 className="text-xl font-semibold text-knightly-green">Optional Add-Ons</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                  {ADD_ONS.map((addOn) => (
                    <AddOnSwitch
                      key={addOn.id}
                      addOn={addOn}
                      enabled={form.watch('addOns').includes(addOn.id)}
                      disabled={isAddOnIncluded(addOn.id)}
                      tooltipText={getAddOnTooltip(addOn.id)}
                      onToggle={handleAddOnToggle}
                    />
                  ))}
                </div>
                
                {/* Add-On Discounts Info */}
                <div className="bg-gray-100 rounded-md p-4 mt-6">
                  <p className="font-semibold">Add-On Discounts:</p>
                  <ul className="text-sm mt-1">
                    <li>• 2 Add-Ons: 10% off add-ons</li>
                    <li>• 3 Add-Ons: 15% off add-ons</li>
                    <li>• 4+ Add-Ons: 20% off add-ons</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Sidebar with Quote Summary and Personal Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Quote Summary */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-knightly-green">Your Quote Summary</h3>
                  <QuoteSummary quote={quote} />
                </div>
                
                {/* Personal Information */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-knightly-green">Your Information</h3>
                  
                  <div className="space-y-4">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Event Type Selection */}
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Event Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {EVENT_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Date Picker */}
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Event Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PP")
                                  ) : (
                                    <span>dd/mm/yyyy</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Email Address */}
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-knightly-green hover:bg-knightly-green-light text-white mt-4"
                      disabled={formSubmitting || !quote}
                    >
                      {formSubmitting ? "Submitting..." : "Submit Booking Enquiry"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
