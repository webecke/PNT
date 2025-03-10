import { beforeEach, describe, it } from "@jest/globals";
import { AlmightySingleton } from "@/construction/AlmightySingleton";
import { ServiceFactory } from "@/construction/ServiceFactory";
import { instance, mock } from "@typestrong/ts-mockito";
import { ServerFactory } from "@/construction/ServerFactory";
import { AuthService } from "@/service/AuthService";

describe("The Almighty Singleton", () => {
  const singleton: AlmightySingleton = AlmightySingleton.getInstance();

  it("can create a ServiceFactory", () => {
    const serviceFactory: ServiceFactory = singleton.getServiceFactory();
  });
});

describe("ServiceFactory", () => {
  let serverFactoryMock: ServerFactory;
  let serviceFactory: ServiceFactory;

  beforeEach(() => {
    serverFactoryMock = mock<ServerFactory>();
    const server = instance(serverFactoryMock);
    serviceFactory = new ServiceFactory(server);
  });

  it("can create an AuthService", () => {
    const authService: AuthService = serviceFactory.getAuthService();
  });
});
