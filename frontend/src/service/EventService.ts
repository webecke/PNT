import { ServerFacade } from "@/service/server";
import { NewEventData, TimelineEvent } from "@/model/TimelineEvent";
import { AlmightySingleton } from "@/AlmightySingleton";
import { hardcodedEventIds } from "@/utils/mockContacts";
import { UpdateEventRequest } from "@/service/server/message/EventMessage";

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

  public async updateEvent(event: UpdateEventRequest): Promise<void> {
    await this.server.updateEvent(event);
  }

  public async getTimeline(userId: string, categoryIds: string[], contactIds: string[]): Promise<TimelineEvent[]> {
    const response = await this.server.getTimeline(userId, categoryIds, contactIds);
    console.log(`Got timeline. Returned value (though not being used b/c hardcoding): ${JSON.stringify(response.timeline)}`);
    if (!response.timeline) { // TODO allow empty timelines
      throw new Error(`Failed to get timeline for userId '${userId}'`);
    }
    return await this.getHardcodedEvents();
    // return response.timeline.events;
  }

  private async getHardcodedEvents(): Promise<TimelineEvent[]> {
    const events: TimelineEvent[] = [];
    for (const eventId of hardcodedEventIds) {
      const event = await this.getEvent(eventId);
      console.log(`Got hardcoded event ${eventId}. Result: ${JSON.stringify(event)}`);
      events.push(event);
    }
    return events;
  }
}
