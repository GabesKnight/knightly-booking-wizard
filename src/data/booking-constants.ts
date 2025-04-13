
import { AddOn, Package } from "@/types/booking-types";

export const PACKAGES: Package[] = [
  {
    id: 'digital',
    name: 'Digital Package',
    price: 399,
    minHours: 1,
    maxHours: 4,
    hours: '1-4 Hours',
    features: [
      { text: 'Instant Sharing (Wi-Fi Required)', included: true, addonId: 'instant-sharing' },
      { text: 'Boomerangs & GIFs', included: true, addonId: 'boomerangs' },
      { text: 'Customized Photo Template', included: true, addonId: 'custom-template' },
      { text: 'Prop Signs', included: true, addonId: 'prop-signs' },
      { text: 'No Prints', included: false, addonId: null },
      { text: 'No Attendant', included: false, addonId: null }
    ]
  },
  {
    id: 'print',
    name: 'Print Package',
    price: 649,
    minHours: 2,
    maxHours: 2, // Changed from 4 to 2 to make it fixed at 2 hours
    hours: '2 Hours', // Updated to show fixed 2 hours instead of range
    features: [
      { text: 'Unlimited Prints (2x6 Strips)', included: true, addonId: 'unlimited-prints' },
      { text: 'Instant Sharing (Wi-Fi Required)', included: true, addonId: 'instant-sharing' },
      { text: 'Customized Photo Template', included: true, addonId: 'custom-template' },
      { text: 'Prop Signs', included: true, addonId: 'prop-signs' },
      { text: 'Downloadable Photos', included: true, addonId: null },
      { text: 'High Resolution Photos', included: true, addonId: null },
      { text: 'On-Site Attendant', included: true, addonId: 'attendant' }
    ]
  },
  {
    id: 'ultimate',
    name: 'Ultimate Package',
    price: 799,
    minHours: 1,
    maxHours: 4,
    hours: '1-4 Hours',
    features: [
      { text: 'Unlimited Prints (2x6 or 4x6)', included: true, addonId: 'unlimited-prints' },
      { text: 'Instant Sharing (Wi-Fi Required)', included: true, addonId: 'instant-sharing' },
      { text: 'Boomerangs & GIFs', included: true, addonId: 'boomerangs' },
      { text: 'Customized Photo Template', included: true, addonId: 'custom-template' },
      { text: 'Prop Signs', included: true, addonId: 'prop-signs' },
      { text: 'USB Thumb Drive with All Photos', included: true, addonId: 'usb-drive' },
      { text: 'Video Guestbook', included: true, addonId: 'video-guestbook' },
      { text: 'On-Site Attendant', included: true, addonId: 'attendant' }
    ]
  }
];

export const ADD_ONS: AddOn[] = [
  { id: 'instant-sharing', name: 'Instant Sharing', price: 49, description: 'Wi-Fi Required' },
  { id: 'custom-template', name: 'Customized Photo Template', price: 39 },
  { id: 'unlimited-prints', name: 'Unlimited Prints', price: 99 },
  { id: 'usb-drive', name: 'USB Thumb Drive', price: 59, description: 'With All Photos' },
  { id: 'premium-backdrop', name: 'Premium Backdrop', price: 149 },
  { id: 'boomerangs', name: 'Boomerangs & GIFs', price: 69 },
  { id: 'prop-signs', name: 'Prop Signs', price: 29 },
  { id: 'attendant', name: 'On-Site Attendant', price: 129 },
  { id: 'video-guestbook', name: 'Video Guestbook', price: 89 },
  { id: 'social-media', name: 'Social Media Station', price: 125 }
];

export const EVENT_TYPES = [
  'Wedding',
  'Birthday',
  'Corporate',
  'Anniversary',
  'Graduation',
  'Holiday Party',
  'Reunion',
  'Other'
];

export const EXTRA_HOURS_PRICE = 99;
export const EXTRA_HOURS_MAX = 6;

export const ADD_ON_DISCOUNT_TIERS = [
  { count: 2, discount: 0.10 }, // 10% off for 2 add-ons
  { count: 3, discount: 0.15 }, // 15% off for 3 add-ons
  { count: 4, discount: 0.20 }  // 20% off for 4+ add-ons
];
