
import { AddOn, Package } from "@/types/booking-types";

export const PACKAGES: Package[] = [
  {
    id: 'digital',
    name: 'Digital Package',
    price: 399,
    hours: '1-4 Hours',
    features: [
      { text: 'Instant Sharing (Wi-Fi Required)', included: true },
      { text: 'Boomerangs & GIFs', included: true },
      { text: 'Customized Photo Template', included: true },
      { text: 'Prop Signs', included: true },
      { text: 'No Prints', included: false },
      { text: 'No Attendant', included: false }
    ]
  },
  {
    id: 'print',
    name: 'Print Package',
    price: 649,
    hours: '2 Hours',
    features: [
      { text: 'Unlimited Prints (2x6 Strips)', included: true },
      { text: 'Instant Sharing (Wi-Fi Required)', included: true },
      { text: 'Customized Photo Template', included: true },
      { text: 'Prop Signs', included: true },
      { text: 'Downloadable Photos', included: true },
      { text: 'High Resolution Photos', included: true },
      { text: 'On-Site Attendant', included: true }
    ]
  },
  {
    id: 'ultimate',
    name: 'Ultimate Package',
    price: 799,
    hours: '1-4 Hours',
    features: [
      { text: 'Unlimited Prints (2x6 or 4x6)', included: true },
      { text: 'Instant Sharing (Wi-Fi Required)', included: true },
      { text: 'Boomerangs & GIFs', included: true },
      { text: 'Customized Photo Template', included: true },
      { text: 'Prop Signs', included: true },
      { text: 'USB Thumb Drive with All Photos', included: true },
      { text: 'Video Guestbook', included: true },
      { text: 'On-Site Attendant', included: true }
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
