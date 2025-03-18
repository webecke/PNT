import { Presenter, View } from "@/presenter/Presenter";
import { Contact } from "@/utils/mockContacts";
import { TimelineEvent } from "@/utils/mockTimelineEvents";
import ContactService from "@/service/ContactService";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";
import { mockAuthToken } from "@/utils/mockAuthToken";
import TimelineService, { TimelineQuery } from "@/service/TimelineService";

export interface ContactDetailView extends View {
}

export class ContactDetailPresenter extends Presenter<ContactDetailView> {
  private contactService: ContactService = new ContactService(tempServerFacadeImpl);
  private timelineService: TimelineService = new TimelineService(tempServerFacadeImpl);

  constructor(protected view: ContactDetailView) {
    super(view);
  }

  public async getContact(userId: number): Promise<Contact | undefined> {
    try {
      return await this.contactService.getContact(userId, mockAuthToken);
    } catch {
      return undefined;
    }
  }

  public async getContactTimeline(userId: number): Promise<TimelineEvent[]> {
    const query: TimelineQuery = { requiredAttendees: [userId] };
    try {
      return await this.timelineService.queryTimeline(query, mockAuthToken);
    } catch {
      return [];
    }
  }
}
