import { ServerFacade } from "@/service/server";
import { Category } from "@/model/Category";

export default class CategoryService {
  constructor(private server: ServerFacade) {
  }

  public async createCategory(name: string): Promise<void> {
    await this.server.category.addCategory(name);
  }

  public async setCategoryText(category: Category): Promise<void> {
    await this.server.category.updateCategory(category.id, category.label);
  }

  public async getCategory(categoryId: string): Promise<Category | undefined> {
    const response = await this.server.category.getCategory(categoryId);
    return response.category;
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    await this.server.category.deleteCategory(categoryId);
  }
}
