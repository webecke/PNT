import { Presenter, View } from "@/presenter/Presenter";
import { TimelineEvent } from "@/model/TimelineEvent";
import EventService from "@/service/EventService";
import { UpdateEventRequest } from "@/service/server/message/EventMessage";

export interface EventDetailView extends View {
}

export class EventDetailPresenter extends Presenter<EventDetailView> {
  private service: EventService = new EventService();

  constructor(protected view: EventDetailView) {
    super(view);
  }

  public async getEvent(eventId: string): Promise<TimelineEvent> {
    return await this.service.getEvent(eventId);
  }

  public async getContacts(contactIds: string[]): Promise<any> {
    return await this.service.getContacts(contactIds);
  }

  public async editEvent(eventId: string, title: string, date: string, description: string) {
    const event: UpdateEventRequest = {
      id: eventId,
      title: title,
      date: date,
      description: description,
      categories: [],
      contacts: [],
    };
    await this.service.updateEvent(event);
  }
}
