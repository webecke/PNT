import {Presenter, View} from "@/presenter/Presenter";
import { AuthService } from "@/service/AuthService";
import AuthServiceImpl from "@/service/AuthServiceImpl";
import { ServerFacadeImpl } from "@/serverFacade/ServerFacadeImpl";

export interface AuthenticationPresenterView extends View {
}

export class AuthenticationPresenter<V extends AuthenticationPresenterView> extends Presenter<V> {
  protected _service: AuthService;

  constructor(view: V, service?: AuthService) {
    super(view);
    this._service = service ?? new AuthServiceImpl(new ServerFacadeImpl());
  }
}
