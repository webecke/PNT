import { NavigableView, Presenter } from '@/presenter/Presenter';
import ContactService from '@/service/ContactService';
import { AddContactRequest } from '@/service/server/message/ContactMessage';

export interface AddContactView extends NavigableView {}

export class AddContactPresenter extends Presenter<AddContactView> {
  private service: ContactService = new ContactService();

  constructor(protected view: AddContactView) {
    super(view);
  }

  public async submit(newContactData: AddContactRequest) {
    console.log('Form submitted. Adding contact: ', newContactData);
    const success = await this.service.createContact(newContactData);
    if (success) {
      this.view.navigateTo('/');
    }
    return success;
  }
}
