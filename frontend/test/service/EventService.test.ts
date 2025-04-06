import { beforeEach, describe, it } from "@jest/globals";
import { anything, instance, mock, verify, when } from "@typestrong/ts-mockito";
import { NewEventData, TimelineEvent } from "@/model/TimelineEvent";
import EventService from "@/service/EventService";
import { ServerFacade } from "@/service/server";
import { BasicResponse } from "@/service/server/message/BasicResponse";
import { GetEventResponse } from "@/service/server/message/EventMessage";

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

const basicResponse: BasicResponse = {
  success: true
};

const getEventResponse: GetEventResponse = {
  ...basicResponse,
  event: {} as TimelineEvent
};

describe("EventService", () => {
  let serverMock: ServerFacade;
  let service: EventService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    service = new EventService(server);

    when(serverMock.addEvent(anything())).thenResolve(basicResponse);
    when(serverMock.getEvent(anything())).thenResolve(getEventResponse); // GetEventResponse
    when(serverMock.updateEvent(anything())).thenResolve(basicResponse);
    when(serverMock.deleteEvent(anything())).thenResolve(basicResponse);
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
