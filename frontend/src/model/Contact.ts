export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
  image?: string;
  timeline: string[];
  category?: string[];
}
