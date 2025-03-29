import { Category } from "@/model/category";
import { Contact } from "@/model/contact";

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  contacts: Contact[];
  categories: Category[];
}
