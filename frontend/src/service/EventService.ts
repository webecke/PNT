import { ServerFacade } from "@/service/server";
import { NewEventData, TimelineEvent } from "@/model/TimelineEvent";

export default class EventService {
  constructor(private server: ServerFacade) {
  }

  public async createEvent(newEventData: NewEventData): Promise<void> {
    await this.server.addEvent(newEventData);
  }

  public async getEvent(eventId: string): Promise<TimelineEvent | undefined> {
    const response = await this.server.getEvent(eventId);
    return response.event;
  }

  public async deleteEvent(eventId: string): Promise<void> {
    await this.server.deleteEvent(eventId);
  }

  public async updateEvent(event: TimelineEvent): Promise<void> {
    await this.server.updateEvent(event); // TODO Split into multiple functions
  }

  public async getTimeline(userId: string, categoryIds: string[], contactIds: string[]): Promise<TimelineEvent[]> {
    const response = await this.server.getTimeline("userId", categoryIds, contactIds);
    return response.timeline?.events ?? [];
  }
}
