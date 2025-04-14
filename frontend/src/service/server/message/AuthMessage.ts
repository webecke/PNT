import { BasicResponse } from "@/service/server/message/BasicResponse";
import { User } from "@/model/User";

export interface AuthResponse extends BasicResponse{
  authtoken: string;
}

export interface LoginResponse extends AuthResponse{
  user?: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}
