import { beforeEach, describe, it } from "@jest/globals";
import { AuthService } from "@/service/AuthService";
import { LoginPresenter, LoginPresenterView } from "@/presenter/authentication/LoginPresenter";
import { instance, mock, verify } from "@typestrong/ts-mockito";

describe("LoginPresenter", () => {
  let authServiceMock: AuthService;
  let viewMock: LoginPresenterView;
  let presenter: LoginPresenter;

  beforeEach(() => {
    authServiceMock = mock<AuthService>();
    const authService = instance(authServiceMock);
    viewMock = mock<LoginPresenterView>(viewMock);
    const view = instance(viewMock);
    presenter = new LoginPresenter(view, authService);
  });

  it("calls service.register() with correct email and password when signup() is called", () => {
    presenter.login("EMAIL", "PASS");
    verify(authServiceMock.login("EMAIL", "PASS")).once();
  });
});
