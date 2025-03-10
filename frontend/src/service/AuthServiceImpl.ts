import { ServerFacade } from "@/serverFacade/ServerFacade";

export default class AuthServiceImpl {
  constructor(private server: ServerFacade) {
  };

  public async register(email: string, password: string) {
    return this.server.register(email, password);
  }

  public async login(email: string, password: string) {
    return this.server.login(email, password);
  }
}
