import { User } from "@/model/User";
import { BasicResponse } from "@/service/server/message/BasicResponse";

export type UserRequest = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export type UserResponse = {
  user: User
} & BasicResponse
