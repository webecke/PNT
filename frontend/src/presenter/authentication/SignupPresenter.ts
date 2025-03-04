import {AuthenticationPresenter, AuthenticationPresenterView} from "@/presenter/authentication/AuthenticationPresenter";

export interface SignupPresenterView extends AuthenticationPresenterView {
}

export class SignupPresenter extends AuthenticationPresenter<SignupPresenterView> {
  constructor(view: SignupPresenterView) {
    super(view);
  }

  public async signup(email: string, password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      const authToken = await this._service.register(email, password);
      // TODO handle failed register
      // TODO error handling
      this.view.navigateTo("/login"); // Redirect to login after successful signup
    } else {
      // TODO improved error reporting
      alert("Passwords do not match!");
    }
  }
}
