import { Presenter, View } from "@/presenter/Presenter";
import { Contact } from "@/model/Contact";
import { TimelineEvent } from "@/model/TimelineEvent";
import ContactService from "@/service/ContactService";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";
import { mockAuthToken } from "@/utils/mockAuthToken";
import EventService, { TimelineQuery } from "@/service/EventService";

export interface ContactDetailView extends View {
}

export class ContactDetailPresenter extends Presenter<ContactDetailView> {
  private contactService: ContactService = new ContactService(tempServerFacadeImpl);
  private eventService: EventService = new EventService(tempServerFacadeImpl);

  constructor(protected view: ContactDetailView) {
    super(view);
  }

  public async getContact(userId: string): Promise<Contact | undefined> {
    try {
      return await this.contactService.getContact(userId, mockAuthToken);
    } catch {
      return undefined;
    }
  }

  public async getContactTimeline(userId: string): Promise<TimelineEvent[]> {
    const query: TimelineQuery = { requiredAttendees: [userId] };
    try {
      return await this.eventService.queryTimeline(query, mockAuthToken);
    } catch {
      return [];
    }
  }
}
