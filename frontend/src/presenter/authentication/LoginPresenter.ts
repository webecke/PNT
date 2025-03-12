import {
  AuthenticationPresenter,
  AuthenticationPresenterView
} from "@/presenter/authentication/AuthenticationPresenter";

export interface LoginPresenterView extends AuthenticationPresenterView {
}

export class LoginPresenter extends AuthenticationPresenter<LoginPresenterView> {
  constructor(view: LoginPresenterView) {
    super(view);
  }

  public async login(email: string, password: string) {
    await this._service.login(email, password);
    // TODO handle failed login
    // TODO error handling

    // TODO set logged in user and authToken, preferably with a userID (cookie? ReactContext?)

    this.view.navigateTo("/"); // Redirect to main page is login was successful
  }
}
