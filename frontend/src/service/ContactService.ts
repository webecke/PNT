import { AuthToken } from "@/model/AuthToken";
import { Contact } from "@/model/Contact";
import IServerFacade from "@/service/IServerFacade";

export interface ContactListQuery {
  // TODO
  requiredCategories: number[];
}

export interface ContactListQueryResult {
  // TODO
  contacts: Contact[];
}

export interface NewContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
}

export default class ContactService {
  constructor(private server: IServerFacade) {
  }

  public async createContact(newContactData: NewContactData, auth: AuthToken): Promise<void> {
    await this.server.createContact(newContactData, auth);
  }

  public async getContact(contactId: string, auth: AuthToken): Promise<Contact> {
    return await this.server.getContact(contactId, auth);
  }

  public async queryContactList(query: ContactListQuery, auth: AuthToken): Promise<Contact[]> {
    const result = await this.server.queryContactList(query, auth);
    return result.contacts;
  }

  public async deleteContact(contactId: string, auth: AuthToken): Promise<void> {
    await this.server.deleteContact(contactId, auth);
  }

  public async updateContact(contact: Contact, auth: AuthToken): Promise<void> {
    await this.server.updateContact(contact, auth);
  }
}
