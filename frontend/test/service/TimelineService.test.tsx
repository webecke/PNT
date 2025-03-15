import { beforeEach, describe, it } from "@jest/globals";
import IServerFacade from "@/service/IServerFacade";
import { anything, instance, mock, verify, when } from "@typestrong/ts-mockito";
import { AuthToken } from "@/model/model";
import TimelineService, { TimelineQuery } from "@/service/TimelineService";

const QUERY_W_NO_REQUIREMENTS: TimelineQuery = {
  requiredAttendees: []
};

const TOKEN: AuthToken = {
  token: "TEST-AUTH-TOKEN"
}

describe("TimelineService", () => {
  let serverMock: IServerFacade;
  let service: TimelineService;

  beforeEach(() => {
    serverMock = mock<IServerFacade>();
    const server = instance(serverMock);
    service = new TimelineService(server);

    when(serverMock.queryTimeline(anything(), anything())).thenResolve(
      { events: [] }
    );
  });

  it("calls the server correctly when queryTimeline() is called with no requirements", () => {
    service.queryTimeline(QUERY_W_NO_REQUIREMENTS, TOKEN);
    verify(serverMock.queryTimeline(QUERY_W_NO_REQUIREMENTS, TOKEN)).once();
  });
});
