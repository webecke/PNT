import { beforeEach, describe, it } from "@jest/globals";
import IServerFacade from "@/service/IServerFacade";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken } from "@/model/model";
import { TimelineEvent } from "@/utils/mockTimelineEvents";
import EventService from "@/service/EventService";

const EVENT: TimelineEvent = {
  id: 0,
  name: "EVENT-NAME",
  date: "EVENT-DATE",
  desc: "EVENT-DESCRIPTION",
  categories: [],
  contacts: [],
}

const TOKEN: AuthToken = {
  token: "TEST-AUTH-TOKEN"
}

describe("EventService", () => {
  let serverMock: IServerFacade;
  let service: EventService;

  beforeEach(() => {
    serverMock = mock<IServerFacade>();
    const server = instance(serverMock);
    service = new EventService(server);
  });

  it("calls the server correctly when createEvent() is called", () => {
    service.createEvent(EVENT, TOKEN);
    verify(serverMock.createEvent(EVENT, TOKEN)).once();
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
