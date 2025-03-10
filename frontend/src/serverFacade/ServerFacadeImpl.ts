import { ServerFacade } from "@/serverFacade/ServerFacade";

export class ServerFacadeImpl implements ServerFacade {
  register(email: string, password: string): Promise<string> {
    return Promise.resolve("FAKE-AUTH-TOKEN");
  }
}
