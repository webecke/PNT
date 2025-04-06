import { beforeEach, describe, it } from "@jest/globals";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import CategoryService from "@/service/CategoryService";
import { Category } from "@/model/Category";
import { ServerFacade } from "@/service/server";

const CATEGORY: Category = {
  id: "TEST-CATEGORY-ID",
  label: "TEST-CATEGORY"
}

describe("CategoryService", () => {
  let serverMock: ServerFacade;
  let service: CategoryService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    service = new CategoryService(server);
  });

  it("calls the server correctly when createCategory() is called", () => {
    service.createCategory(CATEGORY.label);
    verify(serverMock.addCategory(CATEGORY.label)).once();
  });

  it("calls the server correctly when setCategoryText() is called", () => {
    const newLabel = "new category name";
    service.setCategoryText({ ...CATEGORY, label: newLabel });
    verify(serverMock.updateCategory(CATEGORY.id, newLabel)).once();
  });

  it("calls the server correctly when getCategory() is called", () => {
    service.getCategory(CATEGORY.id);
    verify(serverMock.getCategory(CATEGORY.id)).once();
  });

  it("calls the server correctly when deleteCategory() is called", () => {
    service.deleteCategory(CATEGORY.id);
    verify(serverMock.deleteCategory(CATEGORY.id)).once();
  });
});
