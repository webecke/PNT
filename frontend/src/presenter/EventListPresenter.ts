import { Presenter, View } from "@/presenter/Presenter";
import EventService from "@/service/EventService";
import { TimelineEvent } from "@/model/TimelineEvent";
import { hardcodedCategoryIds, hardcodedContactIds } from "@/utils/mockContacts";

export interface EventListView extends View {
}

export class EventListPresenter extends Presenter<EventListView> {
  private service: EventService = new EventService();

  constructor(protected view: EventListView) {
    super(view);
  }

  public async getTimeline(categoryId?: string): Promise<TimelineEvent[]> {
    // TODO un-hardcode userId
    const userId = "HARDCODED USER ID";

    // TODO? Support multiple simultaneous filters?
    const categoryIds: string[] = categoryId ? [categoryId] : hardcodedCategoryIds;

    // TODO? Support filtering contacts?
    const contactIds: string[] = hardcodedContactIds;

    return await this.service.getTimeline(userId, categoryIds, contactIds);
  }
}
