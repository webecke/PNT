import {Presenter, View} from "@/presenter/Presenter";
import AuthServiceImpl from "@/service/AuthServiceImpl";
import { ServerFacadeImpl } from "@/serverFacade/ServerFacadeImpl";

export interface AuthenticationPresenterView extends View {
}

export class AuthenticationPresenter<V extends AuthenticationPresenterView> extends Presenter<V> {
  protected _service: AuthServiceImpl;

  constructor(view: V) {
    super(view);
    this._service = this.createService();
  }

  private createService() {
    return new AuthServiceImpl(new ServerFacadeImpl());
  }
}
