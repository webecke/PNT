import { Person } from "@/model/Person";

export interface User extends Person {
  username: string,
  password: string
}
