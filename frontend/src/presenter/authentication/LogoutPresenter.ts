import {
  AuthenticationPresenter,
  AuthenticationPresenterView,
} from '@/presenter/authentication/AuthenticationPresenter';

export interface LogoutPresenterView extends AuthenticationPresenterView {}

export class LogoutPresenter extends AuthenticationPresenter<LogoutPresenterView> {
  constructor(view: LogoutPresenterView) {
    super(view);
  }

  public async logout() {
    const response = await this._service.logout();
    // TODO handle failed login
    // TODO error handling

    // TODO set logged in user and authToken, preferably with a userID (cookie? ReactContext?)

    if (response) this.view.navigateTo('/'); // Redirect to main page is login was successful
    return response;
  }
}
