import {AuthenticationPresenter, AuthenticationPresenterView} from "@/presenter/authentication/AuthenticationPresenter";

export interface SignupPresenterView extends AuthenticationPresenterView {
}

export class SignupPresenter extends AuthenticationPresenter<SignupPresenterView> {
  constructor(view: SignupPresenterView) {
    super(view);
  }

  public async signup(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      await this._service.register(firstName, lastName, email, password);
      // TODO handle failed register
      // TODO error handling
      this.view.navigateTo("/login"); // Redirect to login after successful signup
    } else {
      // TODO improved error reporting
      alert("Passwords do not match!");
    }
  }
}
