import { beforeEach, describe, it } from "@jest/globals";
import IServerFacade from "@/service/IServerFacade";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken } from "@/model/AuthToken";
import { NewEventData, TimelineEvent } from "@/model/TimelineEvent";
import EventService from "@/service/EventService";

const NEW_EVENT_DATA: NewEventData = {
  name: "EVENT-NAME",
  desc: "EVENT-DESCRIPTION",
  date: new Date(),
  categories: [],
  contacts: [],
};

const EVENT: TimelineEvent = {
  ...NEW_EVENT_DATA,
  id: "FAKE-EVENT-ID",
};

const TOKEN: AuthToken = {
  token: "TEST-AUTH-TOKEN",
  userId: "TEST-USER-ID",
};

describe("EventService", () => {
  let serverMock: IServerFacade;
  let service: EventService;

  beforeEach(() => {
    serverMock = mock<IServerFacade>();
    const server = instance(serverMock);
    service = new EventService(server);
  });

  it("calls the server correctly when createEvent() is called", () => {
    service.createEvent(NEW_EVENT_DATA, TOKEN);
    verify(serverMock.createEvent(NEW_EVENT_DATA, TOKEN)).once();
  });

  it("calls the server correctly when getEvent() is called", () => {
    service.getEvent(EVENT.id, TOKEN);
    verify(serverMock.getEvent(EVENT.id, TOKEN)).once();
  });

  it("calls the server correctly when deleteEvent() is called", () => {
    service.deleteEvent(EVENT.id, TOKEN);
    verify(serverMock.deleteEvent(EVENT.id, TOKEN)).once();
  });

  it("calls the server correctly when updateEvent() is called", () => {
    service.updateEvent(EVENT, TOKEN);
    verify(serverMock.updateEvent(EVENT, TOKEN)).once();
  });
});
