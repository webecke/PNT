import { ServerFacade } from "@/service/server";
import { UserRequest } from "@/service/server/message/UserMessage";
import { User } from "@/model/User";

export default class AuthenticationService {
  constructor(private server: ServerFacade) {
  }

  public async register(firstName: string, lastName: string, email: string, password: string): Promise<User | undefined> {
    const request: UserRequest = { firstName, lastName, password, username: email };
    const response = await this.server.user.addUser(request);
    return response.user;
  }

  public async login(email: string, password: string): Promise<void> {
    await this.server.auth.login(email, password);
  }

  public async logout(): Promise<void> {
    await this.server.auth.logout();
  }
}
