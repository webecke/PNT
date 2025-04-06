import {AuthenticationPresenter, AuthenticationPresenterView} from "@/presenter/authentication/AuthenticationPresenter";

export interface SignupPresenterView extends AuthenticationPresenterView {
}

export class SignupPresenter extends AuthenticationPresenter<SignupPresenterView> {
  constructor(view: SignupPresenterView) {
    super(view);
  }

  public async signup(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      // TODO improved error reporting
      alert("Passwords do not match!");
      return;
    }

    try {
      // TODO store returned User and navigate to home page
      const newUser = await this._service.register(firstName, lastName, email, password);
    } catch (e) {
      console.warn((e as Error).message);
      alert("Sorry, we couldn't register with those credentials.");
      return;
    }

    this.view.navigateTo("/");
  }
}
