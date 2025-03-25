import { beforeEach, describe, it } from "@jest/globals";
import IServerFacade from "@/service/IServerFacade";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken } from "@/model/AuthToken";
import UserService from "@/service/UserService";

const EMAIL = "test.email@email.com";
const PASS = "test-password";
const TOKEN: AuthToken = {
  token: "TEST-AUTH-TOKEN"
}

describe("UserService", () => {
  let serverMock: IServerFacade;
  let service: UserService;

  beforeEach(() => {
    serverMock = mock<IServerFacade>();
    const server = instance(serverMock);
    service = new UserService(server);
  });

  it("calls the server correctly when setUserEmail() is called", () => {
    service.setUserEmail(EMAIL, TOKEN);
    verify(serverMock.setUserEmail(EMAIL, TOKEN)).once();
  });

  it("calls the server correctly when setUserPassword() is called", () => {
    service.setUserPassword(PASS, TOKEN);
    verify(serverMock.setUserPassword(PASS, TOKEN)).once();
  });
});
