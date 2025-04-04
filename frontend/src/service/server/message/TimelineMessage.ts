import { BasicResponse } from "@/service/server/message/BasicResponse";
import { Timeline } from "@/model/Timeline";

export interface TimelineRequest {
  userID: string;
  categoryIDs: string[];
  contactIDs: string[];
}

export interface TimelineResponse extends BasicResponse {
  timeline?: Timeline;
}
