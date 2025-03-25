import { Presenter, View } from "@/presenter/Presenter";
import { TimelineEvent } from "@/model/TimelineEvent";
import EventService from "@/service/EventService";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";
import { mockAuthToken } from "@/utils/mockAuthToken";

export interface EventDetailView extends View {
}

export class EventDetailPresenter extends Presenter<EventDetailView> {
  private service: EventService = new EventService(tempServerFacadeImpl);

  constructor(protected view: EventDetailView) {
    super(view);
  }

  public async getEvent(eventId: number): Promise<TimelineEvent | undefined> {
    return await this.service.getEvent(eventId, mockAuthToken);
  }
}
