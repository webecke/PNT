import { User } from "@/model/User";
import { BasicResponse } from "@/service/server/message/BasicResponse";

export interface UserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface AddUserResponse extends BasicResponse {
  user?: User;
  token?: string;
}
