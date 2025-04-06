import { ServerFacade } from "@/service/server";

export class AlmightySingleton {
  private static instance: AlmightySingleton = new AlmightySingleton();
  private serverFacade: ServerFacade = new ServerFacade();

  static getInstance(): AlmightySingleton {
    return AlmightySingleton.instance;
  }

  public getServerFacade(): ServerFacade {
    return this.serverFacade;
  }
}
