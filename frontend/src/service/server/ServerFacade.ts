/**
 * ServerFacade
 *
 * A service that provides a simplified interface for all backend API interactions.
 * Acts as a facade over the ServerCommunicator, organizing endpoints by domain
 * and handling data transformation between API and application models.
 */
import { ServerCommunicator } from './ServerCommunicator';
import { AuthResponse } from "@/service/server/response/AuthResponse";

export class ServerFacade {
  private communicator: ServerCommunicator;
  private token: AuthToken | null = null;

  constructor() {
    // Initialize the communicator with environment-specific settings
    this.communicator = new ServerCommunicator();
  }

  auth = {
    login: async (username: string, password: string) => {
      const response = await this.communicator.post<AuthResponse>('/auth/login', { username, password })
      // TODO: Handle the response and store the token
    },

    logout: async () => {
      const response = await this.communicator.post<AuthResponse>('/auth/login', this.token)
      this.token = null;
      // TODO: Handle the response
    }
  }

  category = {
    getCategory: async (categoryId: string) => {
      const response = await this.communicator.get(`/categories/${categoryId}`);
      return response;
    },
    deleteCategory: async (categoryId: string) => {
      const response = await this.communicator.delete(`/categories/${categoryId}`);
      return response;
    },
    addCategory: async (categoryData: any) => {
      const response = await this.communicator.post('/categories', categoryData);
      return response;
    },
    updateCategory: async (categoryId: string, categoryData: any) => {
      const response = await this.communicator.post(`/categories/${categoryId}`, categoryData);
      return response;
    }
  }
}

type AuthToken = {
  token: string;
  username: string;
}
