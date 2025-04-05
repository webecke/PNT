import { ServerFacade } from "@/service/server";
import { Category } from "@/model/Category";

export default class CategoryService {
  constructor(private server: ServerFacade) {
  }

  public async createCategory(name: string): Promise<void> {
    await this.server.addCategory(name);
  }

  public async setCategoryText(category: Category): Promise<void> {
    await this.server.updateCategory(category.id, category.label);
  }

  public async getCategory(categoryId: string): Promise<Category | undefined> {
    const response = await this.server.getCategory(categoryId);
    return response.category;
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    await this.server.deleteCategory(categoryId);
  }
}
