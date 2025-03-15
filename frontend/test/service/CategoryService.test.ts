import { beforeEach, describe, it } from "@jest/globals";
import IServerFacade from "@/service/IServerFacade";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken, Category } from "@/model/model";
import CategoryService from "@/service/CategoryService";

const CATEGORY: Category = {
  id: 0,
  name: "TEST-CATEGORY"
}

const TOKEN: AuthToken = {
  token: "TEST-AUTH-TOKEN"
}

describe("CategoryService", () => {
  let serverMock: IServerFacade;
  let service: CategoryService;

  beforeEach(() => {
    serverMock = mock<IServerFacade>();
    const server = instance(serverMock);
    service = new CategoryService(server);
  });

  it("calls the server correctly when createCategory() is called", () => {
    service.createCategory(CATEGORY.name, TOKEN);
    verify(serverMock.createCategory(CATEGORY.name, TOKEN)).once();
  });

  it("calls the server correctly when setCategoryText() is called", () => {
    const renamedCategory = { ...CATEGORY, name: "new category name" };
    service.setCategoryText(renamedCategory, TOKEN);
    verify(serverMock.setCategoryText(renamedCategory, TOKEN)).once();
  });

  it("calls the server correctly when getCategory() is called", () => {
    service.getCategory(CATEGORY.id, TOKEN);
    verify(serverMock.getCategory(CATEGORY.id, TOKEN)).once();
  });
});
