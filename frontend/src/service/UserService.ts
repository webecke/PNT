import { AuthToken, Category } from "@/model/model";
import { Contact } from "@/utils/mockContacts";
import IServerFacade from "@/service/IServerFacade";

export default class UserService {
  constructor(private server: IServerFacade) {
  }
  public async setUserEmail(email: string, auth: AuthToken): Promise<void> {
    await this.server.setUserEmail(email, auth);
  }

  public async setUserPassword(password: string, auth: AuthToken): Promise<void> {
    await this.server.setUserPassword(password, auth);
  }
}
