import { beforeEach, describe, it } from "@jest/globals";
import { AlmightySingleton } from "@/construction/AlmightySingleton";
import { ServiceFactory } from "@/construction/ServiceFactory";
import { ServerFacade } from "@/serverFacade/ServerFacade";
import { AuthService } from "@/service/AuthService";
import AuthServiceImpl from "@/service/AuthServiceImpl";
import { instance, mock, verify } from "@typestrong/ts-mockito";

describe("The Almighty Singleton", () => {
  const singleton: AlmightySingleton = AlmightySingleton.getInstance();

  it("can create a ServiceFactory", () => {
    const serviceFactory: ServiceFactory = singleton.getServiceFactory();
  });
});

describe("ServiceFactory", () => {
  let serverMock: ServerFacade;
  let factory: ServiceFactory;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    factory = new ServiceFactory(server);
  });

  it("can create an AuthService", () => {
    factory.getAuthService();
  });
});

describe("AuthServiceImpl", () => {
  let serverMock: ServerFacade;
  let authService: AuthService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    authService = new AuthServiceImpl(server);
  });

  it("calls the ServerFacade with the correct email and password when register() is called", async () => {
    await authService.register("EMAIL", "PASS");
    verify(serverMock.register("EMAIL", "PASS")).once();
  });

  it("calls the ServerFacade with the correct email and password when login() is called", async () => {
    await authService.login("EMAIL", "PASS");
    verify(serverMock.login("EMAIL", "PASS")).once();
  });
});
