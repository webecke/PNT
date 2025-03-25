import IServerFacade from "@/service/IServerFacade";
import { mockContacts } from "@/utils/mockContacts";
import { mockTimelineEvents } from "@/utils/mockTimelineEvents";
import { ContactListQuery, ContactListQueryResult, NewContactData } from "@/service/ContactService";
import { NewEventData, TimelineQuery, TimelineQueryResult } from "@/service/EventService";
import { Category } from "@/model/Category";
import { AuthToken } from "@/model/AuthToken";
import { Contact } from "@/model/Contact";
import { TimelineEvent } from "@/model/TimelineEvent";

const CATEGORY: Category = { id: 0, name: "CATEGORY-NAME" };

const CONTACT: Contact = { email: "EMAIL", id: 0, name: "CONTACT-NAME", notes: "NOTES", phone: "PHONE", timeline: [] };

const EVENT: TimelineEvent = {
  categories: [],
  contacts: [],
  date: new Date("01-01-1900"),
  desc: "EVENT-DESC",
  id: 0,
  name: "EVENT-NAME"
};

const TIMELINE_QUERY_RESULT: TimelineQueryResult = {
  events: mockTimelineEvents
}

const CONTACT_LIST_QUERY_RESULT: ContactListQueryResult = {
  contacts: mockContacts
}

const TOKEN: AuthToken = { token: "FAKE-AUTH-TOKEN" };

async function und(): Promise<any> {
  return Promise.resolve(undefined);
}

const tempServerFacadeImpl: IServerFacade = {
  createCategory(categoryName: string, auth: AuthToken): Promise<void> {
    return und();
  },
  createContact(contact: NewContactData, auth: AuthToken): Promise<void> {
    return und();
  },
  createEvent(event: NewEventData, auth: AuthToken): Promise<void> {
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
  queryTimeline(timelineQuery: TimelineQuery, auth: AuthToken): Promise<TimelineQueryResult> {
    return Promise.resolve(TIMELINE_QUERY_RESULT);
  },
  queryContactList(timelineQuery: ContactListQuery, auth: AuthToken): Promise<ContactListQueryResult> {
    return Promise.resolve(CONTACT_LIST_QUERY_RESULT);
  },
};

export default tempServerFacadeImpl;
