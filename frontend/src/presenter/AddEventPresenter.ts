import { NavigableView, Presenter } from "@/presenter/Presenter";
import EventService from "@/service/EventService";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";
import { mockAuthToken } from "@/utils/mockAuthToken";
import { NewEventData } from "@/model/TimelineEvent";

export interface AddEventView extends NavigableView {
}

export class AddEventPresenter extends Presenter<AddEventView> {
  private service: EventService = new EventService(tempServerFacadeImpl);

  constructor(protected view: AddEventView) {
    super(view);
  }

  public async submit(newEventData: NewEventData) {
    await this.service.createEvent(newEventData, mockAuthToken);
    console.log("Form submitted. Adding event: ", newEventData);
    this.view.navigateTo("/");
  }
}
