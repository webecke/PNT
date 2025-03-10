import {
  AuthenticationPresenter,
  AuthenticationPresenterView
} from "@/presenter/authentication/AuthenticationPresenter";
import { AuthService } from "@/service/AuthService";

export interface LoginPresenterView extends AuthenticationPresenterView {
}

export class LoginPresenter extends AuthenticationPresenter<LoginPresenterView> {
  constructor(view: LoginPresenterView, service?: AuthService) {
    super(view, service);
  }

  public async login(email: string, password: string) {
    const authToken = await this._service.login(email, password);
    // TODO handle failed login
    // TODO error handling

    // TODO set logged in user, preferably with a userID (cookie? ReactContext?)

    this.view.navigateTo("/"); // Redirect to main page is login was successful
  }
}
