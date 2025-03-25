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

    getContact(contactId: number, auth: AuthToken): Promise<Contact>;

    deleteContact(contactId: number, auth: AuthToken): Promise<void>;

    updateContact(contact: Contact, auth: AuthToken): Promise<void>;

    createEvent(event: NewEventData, auth: AuthToken): Promise<void>;

    getEvent(eventId: number, auth: AuthToken): Promise<TimelineEvent>;

    deleteEvent(eventId: number, auth: AuthToken): Promise<void>;

    updateEvent(event: TimelineEvent, auth: AuthToken): Promise<void>;

    createCategory(categoryName: string, auth: AuthToken): Promise<void>;

    setCategoryText(category: Category, auth: AuthToken): Promise<void>;

    getCategory(categoryId: number, auth: AuthToken): Promise<Category>;

    deleteCategory(categoryId: number, auth: AuthToken): Promise<void>;

    queryTimeline(timelineQuery: TimelineQuery, auth: AuthToken): Promise<TimelineQueryResult>;

    queryContactList(contactListQuery: ContactListQuery, auth: AuthToken): Promise<ContactListQueryResult>;
}
