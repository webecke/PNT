import {Presenter, View} from "@/presenter/Presenter";
import AuthenticationService from "@/service/AuthenticationService";
import tempServerFacadeImpl from "@/service/TempServerFacadeImpl";

export interface AuthenticationPresenterView extends View {
}

export class AuthenticationPresenter<V extends AuthenticationPresenterView> extends Presenter<V> {
  protected _service: AuthenticationService;

  constructor(view: V) {
    super(view);
    this._service = this.createService();
  }

  private createService() {
    return new AuthenticationService(tempServerFacadeImpl);
  }
}
