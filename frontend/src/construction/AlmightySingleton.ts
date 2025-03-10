import { ServiceFactory } from "@/construction/ServiceFactory";
import { ServerFactory } from "@/construction/ServerFactory";

/*
  This class is for injecting service dependencies.

  It breaks the dependency rule, because React will depend on it to
  pass services to components that need them. I've tried to minimize the
  damage, but I never found a better option, so I've deliberately named this
  class badly in hopes that someone (probably me in the future) will design a
  better architecture. May Bob Martin forgive my transgressions.
 */
export class AlmightySingleton {
  private static readonly instance: AlmightySingleton = new AlmightySingleton();
  private readonly serviceFactory: ServiceFactory;

  private constructor() {
    const serverFactory = new ServerFactory();
    this.serviceFactory = new ServiceFactory(serverFactory);
  }

  public static getInstance(): AlmightySingleton {
    return this.instance;
  }

  public getServiceFactory(): ServiceFactory {
    return this.serviceFactory;
  }
}
