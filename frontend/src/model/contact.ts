import { Category } from "@/model/category";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  categories: Category[];
  email: string;
  phone: string;
  note: string;
}
