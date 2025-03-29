import { User } from "@/model/user";
import { BasicResponse } from "@/service/server/message/BasicResponse";

export interface AddUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface AddUserResponse extends BasicResponse {
  user?: User;
  token?: string;
}
