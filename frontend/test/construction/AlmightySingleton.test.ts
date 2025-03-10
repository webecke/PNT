import { beforeEach, describe, it } from "@jest/globals";
import { AlmightySingleton } from "@/construction/AlmightySingleton";
import { ServiceFactory } from "@/construction/ServiceFactory";
import { ServerFacade } from "@/serverFacade/ServerFacade";
import { instance, mock } from "@typestrong/ts-mockito";

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
