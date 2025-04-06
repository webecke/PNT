import { beforeEach, describe, it } from "@jest/globals";
import { anything, instance, mock, verify, when } from "@typestrong/ts-mockito";
import CategoryService from "@/service/CategoryService";
import { Category } from "@/model/Category";
import { ServerFacade } from "@/service/server";
import { BasicResponse } from "@/service/server/message/BasicResponse";
import { GetCategoryResponse } from "@/service/server/message/CategoryMessage";

const CATEGORY: Category = {
  id: "TEST-CATEGORY-ID",
  label: "TEST-CATEGORY"
}

const basicResponse: BasicResponse = {
  success: true
};

const getCategoryResponse: GetCategoryResponse = {
  ...basicResponse,
  category: {} as Category
};

describe("CategoryService", () => {
  let serverMock: ServerFacade;
  let service: CategoryService;

  beforeEach(() => {
    serverMock = mock<ServerFacade>();
    const server = instance(serverMock);
    service = new CategoryService(server);

    when(serverMock.addCategory(anything())).thenResolve(basicResponse);
    when(serverMock.getCategory(anything())).thenResolve(getCategoryResponse);
    when(serverMock.updateCategory(anything(), anything())).thenResolve(basicResponse);
    when(serverMock.deleteCategory(anything())).thenResolve(basicResponse);
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
