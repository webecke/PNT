import { TimelineEvent } from "@/model/TimelineEvent";

export interface Timeline {
  ownerID: string;
  events: TimelineEvent[];
}
