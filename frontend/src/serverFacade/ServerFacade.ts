export interface ServerFacade {
  register(email: string, password: string): Promise<string>;
}
