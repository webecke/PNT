import { describe, it } from "@jest/globals";
import { AlmightySingleton } from "@/construction/AlmightySingleton";

describe("The Almighty Singleton", () => {
  const singleton: AlmightySingleton = AlmightySingleton.getInstance();

  it("can create a ServiceFactory", () => {
    const serviceFactory: ServiceFactory = singleton.getServiceFactory();
  });
});
