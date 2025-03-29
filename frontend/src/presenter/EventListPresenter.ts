import { Presenter, View } from "@/presenter/Presenter";
import { mockAuthToken } from "@/utils/mockAuthToken";
import EventService, { TimelineQuery } from "@/service/EventService";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";
import { TimelineEvent } from "@/model/TimelineEvent";

export interface EventListView extends View {
}

export class EventListPresenter extends Presenter<EventListView> {
  private service: EventService = new EventService(tempServerFacadeImpl);

  constructor(protected view: EventListView) {
    super(view);
  }

  public async getTimeline(): Promise<TimelineEvent[]> {
    const query: TimelineQuery = {
      requiredAttendees: [],
    }
    return await this.service.queryTimeline(query, mockAuthToken);
  }

}
