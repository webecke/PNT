import { beforeEach, describe, it } from "@jest/globals";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { NewEventData, TimelineEvent } from "@/model/TimelineEvent";
import EventService from "@/service/EventService";
import { ServerFacade } from "@/service/server";

const NEW_EVENT_DATA: NewEventData = {
  title: "EVENT-NAME",
  description: "EVENT-DESCRIPTION",
  date: '2000-01-01',
  categories: [],
  contacts: [],
};

const EVENT: TimelineEvent = {
  ...NEW_EVENT_DATA,
  id: "FAKE-EVENT-ID",
};

describe("EventService", () => {
  let serverMock: ServerFacade;
  let service: EventService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    service = new EventService(server);
  });

  it("calls the server correctly when createEvent() is called", () => {
    service.createEvent(NEW_EVENT_DATA);
    verify(serverMock.addEvent(NEW_EVENT_DATA)).once();
  });

  it("calls the server correctly when getEvent() is called", () => {
    service.getEvent(EVENT.id);
    verify(serverMock.getEvent(EVENT.id)).once();
  });

  it("calls the server correctly when deleteEvent() is called", () => {
    service.deleteEvent(EVENT.id);
    verify(serverMock.deleteEvent(EVENT.id)).once();
  });

  it("calls the server correctly when updateEvent() is called", () => {
    service.updateEvent(EVENT);
    verify(serverMock.updateEvent(EVENT)).once();
  });
});
