import { ServerFacade } from "@/service/server";
import { NewEventData, TimelineEvent } from "@/model/TimelineEvent";
import { mockTimelineEvents } from "@/utils/mockTimelineEvents";

export default class EventService {
  constructor(private server: ServerFacade) {
  }

  public async createEvent(newEventData: NewEventData): Promise<void> {
    await this.server.event.addEvent(newEventData);
  }

  public async getEvent(eventId: string): Promise<TimelineEvent | undefined> {
    const response = await this.server.event.getEvent(eventId);
    return response.event;
  }

  public async deleteEvent(eventId: string): Promise<void> {
    await this.server.event.deleteEvent(eventId);
  }

  public async updateEvent(event: TimelineEvent): Promise<void> {
    await this.server.event.updateEvent(event); // TODO Split into multiple functions
  }

  public async getEvents(): Promise<TimelineEvent[]> {
    // TODO getEvents() API call (or add an eventId array to User?)
    console.warn("WARNING getEvents() is unimplemented");
    return mockTimelineEvents;
  }
}
