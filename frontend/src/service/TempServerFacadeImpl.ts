import IServerFacade from "@/service/IServerFacade";
import { mockContacts } from "@/utils/mockContacts";
import { mockTimelineEvents } from "@/utils/mockTimelineEvents";
import { ContactListQuery, ContactListQueryResult, NewContactData } from "@/service/ContactService";
import { TimelineQuery, TimelineQueryResult } from "@/service/EventService";
import { Category } from "@/model/Category";
import { AuthToken } from "@/model/AuthToken";
import { Contact } from "@/model/Contact";
import { NewEventData, TimelineEvent } from "@/model/TimelineEvent";
import { mockAuthToken } from "@/utils/mockAuthToken";

const CATEGORY: Category = {
  id: "FAKE-CATEGORY-ID",
  label: "CATEGORY-NAME",
};

const CONTACT: Contact = {
  email: "EMAIL",
  id: "FAKE-CONTACT-ID",
  firstName: "CONTACT-FIRST-NAME",
  lastName: "CONTACT-LAST-NAME",
  notes: "NOTES",
  phone: "PHONE",
  timeline: [],
};

const EVENT: TimelineEvent = {
  categories: [],
  contacts: [],
  date: "01-01-1900",
  description: "EVENT-DESC",
  id: "FAKE-EVENT-ID",
  title: "EVENT-NAME",
};

const TIMELINE_QUERY_RESULT: TimelineQueryResult = {
  events: mockTimelineEvents
}

const CONTACT_LIST_QUERY_RESULT: ContactListQueryResult = {
  contacts: mockContacts
}

const TOKEN: AuthToken = mockAuthToken;

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
  deleteCategory(categoryId: string, auth: AuthToken): Promise<void> {
    return und();
  },
  deleteContact(contactId: string, auth: AuthToken): Promise<void> {
    return und();
  },
  deleteEvent(eventId: string, auth: AuthToken): Promise<void> {
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

  getCategory(categoryId: string, auth: AuthToken): Promise<Category> {
    return Promise.resolve(CATEGORY);
  },

  getContact(contactId: string, auth: AuthToken): Promise<Contact> {
    return Promise.resolve(CONTACT);
  },

  getEvent(eventId: string, auth: AuthToken): Promise<TimelineEvent> {
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
