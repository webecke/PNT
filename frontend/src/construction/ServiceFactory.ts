import AuthServiceImpl from "@/service/AuthServiceImpl";
import { AuthService } from "@/service/AuthService";
import { ServerFactory } from "@/construction/ServerFactory";

export interface AuthServiceFactory {
  getAuthService(): AuthService
}

export class ServiceFactory implements AuthServiceFactory {
  constructor(private serverFactory: ServerFactory) {
  }

  public getAuthService(): AuthService {
    return new AuthServiceImpl();
  }
}
