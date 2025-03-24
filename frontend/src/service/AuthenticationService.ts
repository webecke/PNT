import { ServerFacade } from "@/service/server";

export default class AuthenticationService {
  private server = new ServerFacade();

  public async register(email: string, password: string) {
    // TODO Contact server
    return `FAKE-AUTH-TOKEN. Credentials: ${email} ${password}`;
  }

  public async login(email: string, password: string) {
    const response = await this.server.auth.login(email, password);
    // TODO what happens now?
    return `FAKE-AUTH-TOKEN. Credentials: ${email} ${password}`;
  }
}
