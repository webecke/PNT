import { Presenter, View } from "@/presenter/Presenter";
import { TimelineEvent } from "@/model/TimelineEvent";
import EventService from "@/service/EventService";

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
}
