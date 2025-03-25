export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  image?: string;
  timeline: string[];
  category?: string[];
}
