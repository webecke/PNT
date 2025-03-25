import { beforeEach, describe, it } from "@jest/globals";
import AuthenticationService from "@/service/AuthenticationService";
import IServerFacade from "@/service/IServerFacade";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken } from "@/model/AuthToken";

const EMAIL = "test.email@email.com";
const PASS = "test-password";
const TOKEN: AuthToken = {
  token: "TEST-AUTH-TOKEN",
  userId: "TEST-USER-ID",
}

describe("AuthService", () => {
  let serverMock: IServerFacade;
  let service: AuthenticationService;

  beforeEach(() => {
    serverMock = mock<IServerFacade>();
    const server = instance(serverMock);
    service = new AuthenticationService(server);
  });

  it("calls the server correctly when register() is called", () => {
    service.register(EMAIL, PASS);
    verify(serverMock.register(EMAIL, PASS)).once();
  });

  it("calls the server correctly when login() is called", () => {
    service.login(EMAIL, PASS);
    verify(serverMock.login(EMAIL, PASS)).once();
  });

  it("calls the server correctly when logout() is called", () => {
    service.logout(TOKEN);
    verify(serverMock.logout(TOKEN)).once();
  });
});
