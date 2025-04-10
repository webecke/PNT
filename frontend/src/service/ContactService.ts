import { Contact } from "@/model/Contact";
import { AddContactRequest } from "@/service/server/message/ContactMessage";
import { ServerFacade } from "@/service/server";
import { hardcodedContactIds } from "@/utils/mockContacts";
import { AlmightySingleton } from "@/AlmightySingleton";

export default class ContactService {
  private server: ServerFacade;

  constructor(server?: ServerFacade) {
    this.server = server ?? AlmightySingleton.getInstance().getServerFacade();
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
    console.warn("WARNING getContacts() is still hardcoded");
    const contactIds = hardcodedContactIds;

    const contacts: Contact[] = [];
    for (const contactId of contactIds) {
      const contact = await this.getContact(contactId);
      contacts.push(contact);
    }
    return contacts;
  }

  public async deleteContact(contactId: string): Promise<void> {
    await this.server.deleteContact(contactId);
  }

  public async updateContact(contact: Contact): Promise<void> {
    await this.server.updateContact(contact);
  }
}
