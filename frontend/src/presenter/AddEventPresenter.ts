import { NavigableView, Presenter } from "@/presenter/Presenter";
import EventService from "@/service/EventService";
import { NewEventData } from "@/model/TimelineEvent";
import { ServerFacade } from "@/service/server";

export interface AddEventView extends NavigableView {
}

export class AddEventPresenter extends Presenter<AddEventView> {
  private service: EventService = new EventService(new ServerFacade());

  constructor(protected view: AddEventView) {
    super(view);
  }

  public async submit(newEventData: NewEventData) {
    await this.service.createEvent(newEventData);
    console.log("Form submitted. Adding event: ", newEventData);
    this.view.navigateTo("/");
  }
}
