import IServerFacade from "@/service/IServerFacade";
import { TimelineEvent } from "@/utils/mockTimelineEvents";
import { AuthToken } from "@/model/model";

export interface TimelineQuery {
  // TODO
  requiredAttendees: number[];
}

export interface TimelineQueryResult {
  // TODO
  events: TimelineEvent[];
}

export default class UserService {
  constructor(private server: IServerFacade) {
  }

  public async queryTimeline(query: TimelineQuery, auth: AuthToken): Promise<TimelineEvent[]> {
    const result = await this.server.queryTimeline(query, auth);
    return result.events;
  }
}
