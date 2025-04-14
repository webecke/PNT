import { NavigableView, Presenter } from "@/presenter/Presenter";
import EventService from "@/service/EventService";
import { NewEventData } from "@/model/TimelineEvent";

export interface AddEventView extends NavigableView {
}

export class AddEventPresenter extends Presenter<AddEventView> {
  private service: EventService = new EventService();

  constructor(protected view: AddEventView) {
    super(view);
  }

  public async submit(newEventData: NewEventData) {
    console.log("Form submitted. Adding event: ", newEventData);
    const response = await this.service.createEvent(newEventData);
    
    if (response.success) this.view.navigateTo("/");
    return response;
  }
}
