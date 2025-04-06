import { beforeEach, describe, it } from "@jest/globals";
import AuthenticationService from "@/service/AuthenticationService";
import { ServerFacade } from "@/service/server";
import { anything, deepEqual, instance, mock, verify, when } from "@typestrong/ts-mockito";
import { AddUserResponse, UserRequest } from "@/service/server/message/UserMessage";
import { User } from "@/model/User";

const USER = {
  username: "test.email@email.com",
  password: "test-password",
  firstName: "test-first-name",
  lastName: "test-last-name",
}

const addUserResponse: AddUserResponse = {
  success: true,
  user: {} as User
};

describe("AuthService", () => {
  let serverMock: ServerFacade;
  let service: AuthenticationService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    service = new AuthenticationService(server);

    when(serverMock.addUser(anything())).thenResolve(addUserResponse);
    when(serverMock.login(anything(), anything())).thenResolve(true);
    when(serverMock.logout()).thenResolve(true);
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
