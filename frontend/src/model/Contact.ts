export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
  image?: string;
  timeline: string[];
  category?: string[];
}
