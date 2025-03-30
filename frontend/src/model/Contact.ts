import { Person } from "@/model/Person";

export interface Contact extends Person {
  id: string;
  phone: string;
  email: string;
  notes: string;
  image?: string;
  timeline: string[];
  categories?: string[];
}
