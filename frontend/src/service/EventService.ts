import { AuthToken } from "@/model/AuthToken";
import IServerFacade from "@/service/IServerFacade";
import { TimelineEvent } from "@/model/TimelineEvent";

export interface NewEventData {
  name: string;
  date: Date;
  desc: string;
  contacts: string[];
  categories: string[];
}

export interface TimelineQuery {
  // TODO
  requiredAttendees: string[];
}

export interface TimelineQueryResult {
  // TODO
  events: TimelineEvent[];
}

export default class EventService {
  constructor(private server: IServerFacade) {
  }

  public async createEvent(newEventData: NewEventData, auth: AuthToken): Promise<void> {
    await this.server.createEvent(newEventData, auth);
  }

  public async getEvent(eventId: string, auth: AuthToken): Promise<TimelineEvent> {
    return await this.server.getEvent(eventId, auth);
  }

  public async deleteEvent(eventId: string, auth: AuthToken): Promise<void> {
    await this.server.deleteEvent(eventId, auth);
  }

  public async updateEvent(event: TimelineEvent, auth: AuthToken): Promise<void> {
    await this.server.updateEvent(event, auth); // TODO Split into multiple functions
  }

  public async queryTimeline(query: TimelineQuery, auth: AuthToken): Promise<TimelineEvent[]> {
    const result = await this.server.queryTimeline(query, auth);
    return result.events;
  }
}
