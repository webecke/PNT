import { beforeEach, describe, it } from "@jest/globals";
import IServerFacade from "@/service/IServerFacade";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import CategoryService from "@/service/CategoryService";
import { AuthToken } from "@/model/AuthToken";
import { Category } from "@/model/Category";

const CATEGORY: Category = {
  id: "TEST-CATEGORY-ID",
  label: "TEST-CATEGORY"
}

const TOKEN: AuthToken = {
  token: "TEST-AUTH-TOKEN",
  userId: "TEST-USER-ID",
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
    service.createCategory(CATEGORY.label, TOKEN);
    verify(serverMock.createCategory(CATEGORY.label, TOKEN)).once();
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

  it("calls the server correctly when deleteCategory() is called", () => {
    service.deleteCategory(CATEGORY.id, TOKEN);
    verify(serverMock.deleteCategory(CATEGORY.id, TOKEN)).once();
  });
});
