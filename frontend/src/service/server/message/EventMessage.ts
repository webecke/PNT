import { BasicResponse } from "@/service/server/message/BasicResponse";

export interface AddEventRequest {
  title: string;
  date: string;
  description: string;
  contacts: string[];
  categories: string[];
}

export interface UpdateEventRequest {
  id: string;
  title: string;
  date: string;
  description: string;
  contacts: string[];
  categories: string[];
}

export interface GetEventResponse extends BasicResponse {
  event?: Event;
}
