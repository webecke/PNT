export default class AuthenticationService {
  public async register(email: string, password: string) {
    // TODO Contact server
    return `FAKE-AUTH-TOKEN. Credentials: ${email} ${password}`;
  }

  public async login(email: string, password: string) {
    // TODO Contact server
    return `FAKE-AUTH-TOKEN. Credentials: ${email} ${password}`;
  }
}
