import { NavigableView, Presenter } from "@/presenter/Presenter";
import ContactService from "@/service/ContactService";
import { ServerFacade } from "@/service/server";
import { AddContactRequest } from "@/service/server/message/ContactMessage";

export interface AddContactView extends NavigableView {
}

export class AddContactPresenter extends Presenter<AddContactView> {
  private service: ContactService = new ContactService(new ServerFacade());

  constructor(protected view: AddContactView) {
    super(view);
  }

  public async submit(newContactData: AddContactRequest) {
    console.log("Form submitted. Adding contact: ", newContactData);
    await this.service.createContact(newContactData);
    this.view.navigateTo("/");
  }
}
