export enum TicketType {
  FREE = 'FREE',
  PAID = 'PAID',
  DONATION = 'DONATION'
}

export enum EventCategory {
  MUSIC = 'Music',
  TECH = 'Technology',
  BUSINESS = 'Business',
  WORKSHOP = 'Workshop',
  SOCIAL = 'Social'
}

export interface TicketBatch {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sold: number;
  type: TicketType;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string; // ISO string
  time: string;
  imageUrl: string;
  organizer: string;
  category: EventCategory;
  batches: TicketBatch[];
}

export interface SalesMetric {
  name: string;
  value: number;
  change: number; // Percentage
  isPositive: boolean;
}

export interface ChartData {
  name: string;
  revenue: number;
  tickets: number;
}
