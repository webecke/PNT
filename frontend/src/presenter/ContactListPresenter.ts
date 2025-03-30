import { Presenter, View } from "@/presenter/Presenter";
import { Contact } from "@/model/Contact";
import ContactService, { ContactListQuery } from "@/service/ContactService";
import { mockAuthToken } from "@/utils/mockAuthToken";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";

export interface ContactListView extends View {
}

export class ContactListPresenter extends Presenter<ContactListView> {
  private service: ContactService = new ContactService(tempServerFacadeImpl);

  constructor(protected view: ContactListView) {
    super(view);
  }

  public async getContacts(): Promise<Contact[]> {
    const query: ContactListQuery = {
      requiredCategories: [],
    }
    return await this.service.queryContactList(query, mockAuthToken);
  }
}
