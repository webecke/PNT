import { BasicResponse } from "@/service/server/message/BasicResponse";
import { Contact } from "@/model/Contact";

export interface AddContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
}

export interface UpdateContactRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
}

export interface GetContactResponse extends BasicResponse {
  contact?: Contact;
}
