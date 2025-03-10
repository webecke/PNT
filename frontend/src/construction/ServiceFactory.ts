import AuthServiceImpl from "@/service/AuthServiceImpl";
import { AuthService } from "@/service/AuthService";
import { ServerFacade } from "@/serverFacade/ServerFacade";

export interface AuthServiceFactory {
  getAuthService(): AuthService
}

export class ServiceFactory implements AuthServiceFactory {
  constructor(private server: ServerFacade) {
  }

  public getAuthService(): AuthService {
    return new AuthServiceImpl();
  }
}
