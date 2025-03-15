import { AuthToken } from "@/model/model";
import { Contact } from "@/utils/mockContacts";
import IServerFacade from "@/service/IServerFacade";

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
    const contact: Contact = {
      id: -1,
      email: newContactData.email,
      name: newContactData.firstName + " " + newContactData.lastName,
      notes: newContactData.notes,
      phone: newContactData.phone,
      timeline: []
    }
    await this.server.createContact(contact, auth);
  }

  public async getContact(contactId: number, auth: AuthToken): Promise<Contact> {
    return await this.server.getContact(contactId, auth);
  }

  public async deleteContact(contactId: number, auth: AuthToken): Promise<void> {
    await this.server.deleteContact(contactId, auth);
  }

  public async updateContact(contact: Contact, auth: AuthToken): Promise<void> {
    await this.server.updateContact(contact, auth);
  }
}
