import { Category } from "@/model/Category";
import { Contact } from "@/model/Contact";

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  contacts: string[];
  categories?: Category[];
}
