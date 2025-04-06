import { Presenter, View } from "@/presenter/Presenter";
import { TimelineEvent } from "@/model/TimelineEvent";
import EventService from "@/service/EventService";
import { ServerFacade } from "@/service/server";

export interface EventDetailView extends View {
}

export class EventDetailPresenter extends Presenter<EventDetailView> {
  private service: EventService = new EventService(new ServerFacade());

  constructor(protected view: EventDetailView) {
    super(view);
  }

  public async getEvent(eventId: string): Promise<TimelineEvent> {
    return await this.service.getEvent(eventId);
  }
}
