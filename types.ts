
export type Page = 'Home' | 'About' | 'Tours' | 'Airport Transfers' | 'Gallery' | 'FAQ' | 'Contact';

export type Theme = 'light' | 'dark';

export interface Tour {
  _id?: string; // From MongoDB
  id: number; // Original ID
  name: string;
  price: number;
  description: string;
  images: string[];
  image: string;
  duration: string;
  additionalInfo: {
    groupSize: string;
    included: string[];
    notIncluded: string[];
  };
}

export interface Testimonial {
  _id?: string;
  id: number;
  quote: string;
  author: string;
  location: string;
}

export interface FaqItem {
  _id?: string;
  id: number;
  question: string;
  answer: string;
}

export interface GalleryImage {
  _id?: string;
  id: number;
  src: string;
  alt: string;
}

export interface Review {
  _id?: string;
  id?: number;
  tourId: number;
  author: string;
  rating: number; // 1-5 stars
  comment: string;
}

export interface TourBooking {
  _id?: string;
  id?: number;
  tourName: string;
  tourId: number;
  date: string;
  passengers: number;
  email: string;
  requests: string;
  bookingDate: Date;
}

export interface AirportTransferBooking {
  _id?: string;
  id?: number;
  name: string;
  email: string;
  flightNumber: string;
  pickupDate: string;
  passengers: string;
  pickupLocation: string;
  dropoffLocation: string;
  bookingDate: Date;
}
