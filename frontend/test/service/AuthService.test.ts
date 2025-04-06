import { beforeEach, describe, it } from "@jest/globals";
import AuthenticationService from "@/service/AuthenticationService";
import { ServerFacade } from "@/service/server";
import { deepEqual, instance, mock, verify } from "@typestrong/ts-mockito";
import { UserRequest } from "@/service/server/message/UserMessage";

const USER = {
  username: "test.email@email.com",
  password: "test-password",
  firstName: "test-first-name",
  lastName: "test-last-name",
}

describe("AuthService", () => {
  let serverMock: ServerFacade;
  let service: AuthenticationService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    service = new AuthenticationService(server);
  });

  it("calls the server correctly when register() is called", () => {
    service.register(USER.firstName, USER.lastName, USER.username, USER.password);
    const expectedUserRequest: UserRequest = USER;
    verify(serverMock.addUser(deepEqual(expectedUserRequest))).once();
  });

  it("calls the server correctly when login() is called", () => {
    service.login(USER.username, USER.password);
    verify(serverMock.login(USER.username, USER.password)).once();
  });

  it("calls the server when logout() is called", () => {
    service.logout();
    verify(serverMock.logout()).once();
  });
});
