import { ServerFacade } from "@/service/server";
import { Category } from "@/model/Category";
import { AlmightySingleton } from "@/AlmightySingleton";

export default class CategoryService {
  private server: ServerFacade;

  constructor(server?: ServerFacade) {
    this.server = server ?? AlmightySingleton.getInstance().getServerFacade();
  }

  public async createCategory(name: string): Promise<void> {
    await this.server.addCategory(name);
  }

  public async setCategoryText(category: Category): Promise<void> {
    await this.server.updateCategory(category.id, category.label);
  }

  public async getCategory(categoryId: string): Promise<Category> {
    const response = await this.server.getCategory(categoryId);
    if (!response.category) {
      throw new Error(`Failed to get category with categoryId '${categoryId}'`);
    }
    return response.category;
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    await this.server.deleteCategory(categoryId);
  }
}
