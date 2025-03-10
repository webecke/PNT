import { ServerFacade } from "@/serverFacade/ServerFacade";
import { ServerFacadeImpl } from "@/serverFacade/ServerFacadeImpl";

export class ServerFactory {
  private readonly server: ServerFacade;

  constructor() {
    this.server = new ServerFacadeImpl();
  }

  public getServerFacade(): ServerFacade {
    return this.server;
  }
}
