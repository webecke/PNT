import {
  AuthenticationPresenter,
  AuthenticationPresenterView,
} from '@/presenter/authentication/AuthenticationPresenter';
import { useUserContext } from '../../contexts/user-context';

export interface SignupPresenterView extends AuthenticationPresenterView {}

export class SignupPresenter extends AuthenticationPresenter<SignupPresenterView> {
  constructor(view: SignupPresenterView) {
    super(view);
  }

  public async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    if (password !== confirmPassword) {
      // TODO improved error reporting
      alert('Passwords do not match!');
      return;
    }

    try {
      // TODO store returned User and navigate to home page
      console.log('Signing up with:', firstName, lastName, email, password);
      const newUser = await this._service.register(firstName, lastName, email, password);
      if (newUser) {
        console.log('Signed up successfully:', newUser);
        this.view.navigateTo('/');
        return newUser;
      }
    } catch (e) {
      console.warn((e as Error).message);
      alert("Sorry, we couldn't register with those credentials.");
      return;
    }
  }
}
