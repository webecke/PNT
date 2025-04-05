import { Presenter, View } from "@/presenter/Presenter";
import EventService from "@/service/EventService";
import { ServerFacade } from "@/service/server";
import { TimelineEvent } from "@/model/TimelineEvent";

export interface EventListView extends View {
}

export class EventListPresenter extends Presenter<EventListView> {
  private service: EventService = new EventService(new ServerFacade());

  constructor(protected view: EventListView) {
    super(view);
  }

  public async getEvents(): Promise<TimelineEvent[]> {
    return await this.service.getEvents();
  }
}
