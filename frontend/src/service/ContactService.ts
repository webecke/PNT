import { AuthToken } from "@/model/model";
import { Contact } from "@/utils/mockContacts";
import IServerFacade from "@/service/IServerFacade";

export default class ContactService {
  constructor(private server: IServerFacade) {
  }

  public async createContact(contact: Contact, auth: AuthToken): Promise<void> {
    await this.server.createContact(contact, auth);
  }

  public async getContact(contactId: number, auth: AuthToken): Promise<Contact> {
    return await this.server.getContact(contactId, auth);
  }

  public async deleteContact(contactId: number, auth: AuthToken): Promise<void> {
    await this.server.deleteContact(contactId, auth);
  }

  public async updateContact(contactId: number, contact: Contact, auth: AuthToken): Promise<void> {
    await this.server.updateContact(contact, auth);
  }
}
