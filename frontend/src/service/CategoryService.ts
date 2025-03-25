import IServerFacade from "@/service/IServerFacade";
import { AuthToken } from "@/model/AuthToken";
import { Category } from "@/model/Category";

export default class CategoryService {
  constructor(private server: IServerFacade) {
  }

  public async createCategory(name: string, auth: AuthToken): Promise<void> {
    await this.server.createCategory(name, auth);
  }

  public async setCategoryText(category: Category, auth: AuthToken): Promise<void> {
    await this.server.setCategoryText(category, auth);
  }

  public async getCategory(categoryId: number, auth: AuthToken): Promise<Category> {
    return await this.server.getCategory(categoryId, auth);
  }

  public async deleteCategory(categoryId: number, auth: AuthToken): Promise<void> {
    await this.server.deleteCategory(categoryId, auth);
  }
}
