import { AuthToken, Category } from "@/model/model";
import { Contact } from "@/utils/mockContacts";
import IServerFacade from "@/service/IServerFacade";

export default class UserService {
  constructor(private server: IServerFacade) {
  }

  public async login(email: string, password: string): Promise<AuthToken> {
    return await this.server.login(email, password);
  }

  public async logout(auth: AuthToken): Promise<void> {
    await this.server.logout(auth);
  }

  public async register(email: string, password: string): Promise<void> {
    await this.server.register(email, password);
  }

  public async setUserEmail(email: string, auth: AuthToken): Promise<void> {
    await this.server.setUserEmail(email, auth);
  }

  public async setUserPassword(password: string, auth: AuthToken): Promise<void> {
    await this.server.setUserPassword(password, auth);
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

  public async createEvent(event: Event, auth: AuthToken): Promise<void> {
    await this.server.createEvent(event, auth);
  }

  public async getEvent(eventId: number, auth: AuthToken): Promise<Event> {
    return await this.server.getEvent(eventId, auth);
  }

  public async deleteEvent(eventId: number, auth: AuthToken): Promise<void> {
    await this.server.deleteEvent(eventId, auth);
  }

  public async setEventDetails(event: Event, auth: AuthToken): Promise<void> {
    await this.server.updateEvent(event, auth); // FIXME
  }

  public async addEventParticipant(eventId: number, contactId: number, event: Event, auth: AuthToken): Promise<void> {
    await this.server.updateEvent(event, auth); // FIXME
  }

  public async removeEventParticipant(eventId: number, contactId: number, event: Event, auth: AuthToken): Promise<void> {
    await this.server.updateEvent(event, auth); // FIXME
  }

  public async createCategory(category: Category, auth: AuthToken): Promise<void> {
    await this.server.createCategory(category, auth);
  }

  public async setCategoryText(category: Category, auth: AuthToken): Promise<void> {
    await this.server.setCategoryText(category, auth);
  }

  public async getCategory(categoryId: number, auth: AuthToken): Promise<Category> {
    return await this.server.getCategory(categoryId, auth);
  }

  public async deleteCategory(categoryId: number, auth: AuthToken): Promise<void> {
    await this.server.deleteCategory(categoryId, auth);
  }
}
