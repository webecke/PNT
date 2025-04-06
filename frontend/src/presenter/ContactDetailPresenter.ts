import { Presenter, View } from "@/presenter/Presenter";
import { Contact } from "@/model/Contact";
import ContactService from "@/service/ContactService";

export interface ContactDetailView extends View {
}

export class ContactDetailPresenter extends Presenter<ContactDetailView> {
  private contactService: ContactService = new ContactService();

  constructor(protected view: ContactDetailView) {
    super(view);
  }

  public async getContact(userId: string): Promise<Contact> {
    return await this.contactService.getContact(userId);
  }
}
