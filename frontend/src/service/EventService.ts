import { ServerFacade } from "@/service/server";
import { NewEventData, TimelineEvent } from "@/model/TimelineEvent";
import { AlmightySingleton } from "@/AlmightySingleton";

export default class EventService {
  private server: ServerFacade;

  constructor(server?: ServerFacade) {
    this.server = server ?? AlmightySingleton.getInstance().getServerFacade();
  }

  public async createEvent(newEventData: NewEventData): Promise<void> {
    await this.server.addEvent(newEventData);
  }

  public async getEvent(eventId: string): Promise<TimelineEvent> {
    const response = await this.server.getEvent(eventId);
    if (!response.event) {
      throw new Error(`Failed to get event for eventId '${eventId}'`);
    }
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
    if (!response.timeline) {
      throw new Error(`Failed to get timeline for userId '${userId}'`);
    }
    return response.timeline.events;
  }
}
