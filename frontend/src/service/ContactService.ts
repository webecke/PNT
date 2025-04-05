import { Contact } from "@/model/Contact";
import { AddContactRequest } from "@/service/server/message/ContactMessage";
import { ServerFacade } from "@/service/server";
import { mockContacts } from "@/utils/mockContacts";

export default class ContactService {
  constructor(private server: ServerFacade) {
  }

  public async createContact(newContactData: AddContactRequest): Promise<void> {
    await this.server.contact.addContact(newContactData);
  }

  public async getContact(contactId: string): Promise<Contact | undefined> {
    const response = await this.server.contact.getContact(contactId);
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
    await this.server.contact.deleteContact(contactId);
  }

  public async updateContact(contact: Contact): Promise<void> {
    await this.server.contact.updateContact(contact);
  }
}
