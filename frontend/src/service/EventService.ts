import { AuthToken } from "@/model/model";
import IServerFacade from "@/service/IServerFacade";

export default class EventService {
  constructor(private server: IServerFacade) {
  }

  public async createEvent(event: Event, auth: AuthToken): Promise<void> {
    await this.server.createEvent(event, auth);
  }

  public async getEvent(eventId: number, auth: AuthToken): Promise<Event> {
    return await this.server.getEvent(eventId, auth);
  }

  public async deleteEvent(eventId: number, auth: AuthToken): Promise<void> {
    await this.server.deleteEvent(eventId, auth);
  }

  public async setEventDetails(event: Event, auth: AuthToken): Promise<void> {
    await this.server.updateEvent(event, auth); // FIXME
  }

  public async addEventParticipant(eventId: number, contactId: number, event: Event, auth: AuthToken): Promise<void> {
    await this.server.updateEvent(event, auth); // FIXME
  }

  public async removeEventParticipant(eventId: number, contactId: number, event: Event, auth: AuthToken): Promise<void> {
    await this.server.updateEvent(event, auth); // FIXME
  }
}
