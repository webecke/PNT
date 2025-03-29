import { AuthToken } from "@/model/AuthToken";
import IServerFacade from "@/service/IServerFacade";

export default class AuthenticationService {
  constructor(private server: IServerFacade) {
  }

  public async register(email: string, password: string): Promise<void> {
    await this.server.register(email, password);
  }

  public async login(email: string, password: string): Promise<AuthToken> {
    return await this.server.login(email, password);
  }

  public async logout(auth: AuthToken): Promise<void> {
    await this.server.logout(auth);
  }
}
