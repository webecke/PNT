import { ServerFacade } from '@/service/server';
import { UserRequest } from '@/service/server/message/UserMessage';
import { User } from '@/model/User';
import { AlmightySingleton } from '@/AlmightySingleton';

export default class AuthenticationService {
  private server: ServerFacade;

  constructor(server?: ServerFacade) {
    this.server = server ?? AlmightySingleton.getInstance().getServerFacade();
  }

  public async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> {
    const request: UserRequest = { firstName, lastName, password, username: email };
    const response = await this.server.addUser(request);
    if (!response.user) {
      throw new Error(`Failed to register user with request: ${JSON.stringify(request)}`);
    }
    return response.user;
  }

  public async login(email: string, password: string): Promise<User | undefined> {
    const response = await this.server.login(email, password);
    return response.user;
  }

  public async logout(): Promise<boolean> {
    const response = await this.server.logout();
    return response;
  }
}
