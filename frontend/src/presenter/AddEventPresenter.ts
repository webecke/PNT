import { NavigableView, Presenter } from "@/presenter/Presenter";
import EventService, { NewEventData } from "@/service/EventService";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";
import { mockAuthToken } from "@/utils/mockAuthToken";
import { parseDate } from "@/utils/dateUtils";

export interface AddEventView extends NavigableView {
}

export interface RawTimelineEvent {
  name: string;
  date: string;
  desc: string;
  contacts: string[];
  categories: string[];
}

export class AddEventPresenter extends Presenter<AddEventView> {
  private service: EventService = new EventService(tempServerFacadeImpl);

  constructor(protected view: AddEventView) {
    super(view);
  }

  public async submit(rawTimelineEvent: RawTimelineEvent) {
    const newEventData: NewEventData = {
      ...rawTimelineEvent,
      date: parseDate(rawTimelineEvent.date),
    };
    await this.service.createEvent(newEventData, mockAuthToken);
    console.log("Form submitted. Adding event: ", rawTimelineEvent);
    this.view.navigateTo("/");
  }
}
