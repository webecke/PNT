import { BasicResponse } from "@/service/server/message/BasicResponse";

export interface AuthResponse extends BasicResponse{
  authtoken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
