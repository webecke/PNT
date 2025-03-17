import { NavigableView, Presenter } from "@/presenter/Presenter";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";
import ContactService, { NewContactData } from "@/service/ContactService";
import { mockAuthToken } from "@/utils/mockAuthToken";

export interface AddContactView extends NavigableView {
}

export class AddContactPresenter extends Presenter<AddContactView> {
  private service: ContactService = new ContactService(tempServerFacadeImpl);

  constructor(protected view: AddContactView) {
    super(view);
  }

  public async submit(newContactData: NewContactData) {
    console.log("Form submitted. Adding contact: ", newContactData);
    await this.service.createContact(newContactData, mockAuthToken);
    this.view.navigateTo("/");
  }
}
