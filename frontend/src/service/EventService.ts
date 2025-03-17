import { AuthToken } from "@/model/model";
import IServerFacade from "@/service/IServerFacade";
import { TimelineEvent } from "@/utils/mockTimelineEvents";

export interface NewEventData {
  name: string;
  date: string;
  desc: string;
  contacts: string[];
  categories: string[];
}

export default class EventService {
  constructor(private server: IServerFacade) {
  }

  public async createEvent(newEventData: NewEventData, auth: AuthToken): Promise<void> {
    await this.server.createEvent(newEventData, auth);
  }

  public async getEvent(eventId: number, auth: AuthToken): Promise<TimelineEvent> {
    return await this.server.getEvent(eventId, auth);
  }

  public async deleteEvent(eventId: number, auth: AuthToken): Promise<void> {
    await this.server.deleteEvent(eventId, auth);
  }

  public async updateEvent(event: TimelineEvent, auth: AuthToken): Promise<void> {
    await this.server.updateEvent(event, auth); // TODO Split into multiple functions
  }
}
