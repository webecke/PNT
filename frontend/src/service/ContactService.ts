import { Contact } from "@/model/Contact";
import { AddContactRequest } from "@/service/server/message/ContactMessage";
import { ServerFacade } from "@/service/server";
import { mockContacts } from "@/utils/mockContacts";

export default class ContactService {
  constructor(private server: ServerFacade) {
  }

  public async createContact(newContactData: AddContactRequest): Promise<void> {
    await this.server.addContact(newContactData);
  }

  public async getContact(contactId: string): Promise<Contact> {
    const response = await this.server.getContact(contactId);
    if (!response.contact) {
      throw new Error(`Failed to get contact with contactId '${contactId}'`);
    }
    return response.contact;
  }

  public async getContacts(): Promise<Contact[]> {
    // TODO getContacts() API call (or add a contactId array to User?)
    console.warn("WARNING getContacts() is unimplemented");
    return mockContacts;
    // const response = await this.server.contact.getContacts();
    // return response.contact;
  }

  public async deleteContact(contactId: string): Promise<void> {
    await this.server.deleteContact(contactId);
  }

  public async updateContact(contact: Contact): Promise<void> {
    await this.server.updateContact(contact);
  }
}
