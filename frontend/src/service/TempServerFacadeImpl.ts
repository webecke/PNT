import IServerFacade from "@/service/IServerFacade";
import { AuthToken, Category } from "@/model/model";
import { Contact } from "@/utils/mockContacts";
import { TimelineEvent } from "@/utils/mockTimelineEvents";

const CATEGORY: Category = { id: 0, name: "CATEGORY-NAME" };

const CONTACT: Contact = { email: "EMAIL", id: 0, name: "CONTACT-NAME", notes: "NOTES", phone: "PHONE", timeline: [] };

const EVENT: TimelineEvent = {
  categories: [],
  contacts: [],
  date: "EVENT-DATE",
  desc: "EVENT-DESC",
  id: 0,
  name: "EVENT-NAME"
};

const TOKEN: AuthToken = { token: "FAKE-AUTH-TOKEN" };

async function und(): Promise<any> {
  return Promise.resolve(undefined);
}

const tempServerFacadeImpl: IServerFacade = {
  createCategory(category: Category, auth: AuthToken): Promise<void> {
    return und();
  },
  createContact(contact: Contact, auth: AuthToken): Promise<void> {
    return und();
  },
  createEvent(event: TimelineEvent, auth: AuthToken): Promise<void> {
    return und();
  },
  deleteCategory(categoryId: number, auth: AuthToken): Promise<void> {
    return und();
  },
  deleteContact(contactId: number, auth: AuthToken): Promise<void> {
    return und();
  },
  deleteEvent(eventId: number, auth: AuthToken): Promise<void> {
    return und();
  },
  logout(auth: AuthToken): Promise<void> {
    return und();
  },
  register(email: string, password: string): Promise<void> {
    return und();
  },
  setCategoryText(category: Category, auth: AuthToken): Promise<void> {
    return und();
  },
  setUserEmail(email: string, auth: AuthToken): Promise<void> {
    return und();
  },
  setUserPassword(password: string, auth: AuthToken): Promise<void> {
    return und();
  },
  updateContact(contact: Contact, auth: AuthToken): Promise<void> {
    return und();
  },
  updateEvent(event: TimelineEvent, auth: AuthToken): Promise<void> {
    return und();
  },

  getCategory(categoryId: number, auth: AuthToken): Promise<Category> {
    return Promise.resolve(CATEGORY);
  },

  getContact(contactId: number, auth: AuthToken): Promise<Contact> {
    return Promise.resolve(CONTACT);
  },

  getEvent(eventId: number, auth: AuthToken): Promise<TimelineEvent> {
    return Promise.resolve(EVENT);
  },

  login(email: string, password: string): Promise<AuthToken> {
    return Promise.resolve(TOKEN);
  },

};

export default tempServerFacadeImpl;
