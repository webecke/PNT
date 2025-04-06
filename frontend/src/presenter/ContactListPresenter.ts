import { Presenter, View } from "@/presenter/Presenter";
import { Contact } from "@/model/Contact";
import ContactService from "@/service/ContactService";

export interface ContactListView extends View {
}

export class ContactListPresenter extends Presenter<ContactListView> {
  private service: ContactService = new ContactService();

  constructor(protected view: ContactListView) {
    super(view);
  }

  public async getContacts(): Promise<Contact[]> {
    return await this.service.getContacts();
  }
}
