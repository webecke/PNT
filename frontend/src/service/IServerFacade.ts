import { Contact } from "@/model/Contact";
import { TimelineEvent } from "@/model/TimelineEvent";
import { NewEventData, TimelineQuery, TimelineQueryResult } from "@/service/EventService";
import { ContactListQuery, ContactListQueryResult, NewContactData } from "@/service/ContactService";
import { AuthToken } from "@/model/AuthToken";
import { Category } from "@/model/Category";

export default interface IServerFacade {
    login(email: string, password: string): Promise<AuthToken>;

    logout(auth: AuthToken): Promise<void>;

    register(email: string, password: string): Promise<void>;

    setUserEmail(email: string, auth: AuthToken): Promise<void>;

    setUserPassword(password: string, auth: AuthToken): Promise<void>;

    createContact(contact: NewContactData, auth: AuthToken): Promise<void>;

    getContact(contactId: string, auth: AuthToken): Promise<Contact>;

    deleteContact(contactId: string, auth: AuthToken): Promise<void>;

    updateContact(contact: Contact, auth: AuthToken): Promise<void>;

    createEvent(event: NewEventData, auth: AuthToken): Promise<void>;

    getEvent(eventId: string, auth: AuthToken): Promise<TimelineEvent>;

    deleteEvent(eventId: string, auth: AuthToken): Promise<void>;

    updateEvent(event: TimelineEvent, auth: AuthToken): Promise<void>;

    createCategory(categoryName: string, auth: AuthToken): Promise<void>;

    setCategoryText(category: Category, auth: AuthToken): Promise<void>;

    getCategory(categoryId: string, auth: AuthToken): Promise<Category>;

    deleteCategory(categoryId: string, auth: AuthToken): Promise<void>;

    queryTimeline(timelineQuery: TimelineQuery, auth: AuthToken): Promise<TimelineQueryResult>;

    queryContactList(contactListQuery: ContactListQuery, auth: AuthToken): Promise<ContactListQueryResult>;
}
