import { ServerFacade } from "@/serverFacade/ServerFacade";

export class ServerFacadeImpl implements ServerFacade {
  public register(email: string, password: string): Promise<string> {
    return Promise.resolve("FAKE-AUTH-TOKEN");
  }

  public login(email: string, password: string): Promise<string> {
    return Promise.resolve("FAKE-AUTH-TOKEN");
  }
}
