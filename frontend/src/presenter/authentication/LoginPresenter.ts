import AuthenticationService from "@/service/AuthenticationService";
import {Presenter, View} from "@/presenter/Presenter";

export interface LoginPresenterView extends View {
  navigateTo: (url: string) => void;
}

export class LoginPresenter extends Presenter<LoginPresenterView> {
  protected _service: AuthenticationService;

  constructor(view: LoginPresenterView) {
    super(view);
    this._service = this.createService();
  }

  public async login(email: string, password: string) {
    const authToken = await this._service.login(email, password);
    // TODO handle failed login
    // TODO error handling

    // TODO set logged in user, preferably with a userID (cookie? ReactContext?)

    this.view.navigateTo("/"); // Redirect to main page is login was successful
  }

  private createService() {
    return new AuthenticationService();
  }
}
