/**
 * ServerFacade
 *
 * A service that provides a simplified interface for all backend API interactions.
 * Acts as a facade over the ServerCommunicator, organizing endpoints by domain
 * and handling data transformation between API and application models.
 */
import { ServerCommunicator } from './ServerCommunicator';
import { UserResponse } from "@/service/server/message/User";
import { User } from "@/model/user";
import { BasicResponse } from "@/service/server/message/BasicResponse";

export class ServerFacade {
  private communicator: ServerCommunicator;
  private token: AuthToken | null = null;

  constructor() {
    this.communicator = new ServerCommunicator();
  }

  auth = {
    login: async (username: string, password: string) => {
      const response = await this.communicator.post('/auth/login', { username, password })
      // TODO: Handle the response and store the token
    },

    logout: async () => {
      const response = await this.communicator.post('/auth/login', this.token)
      this.token = null;
      // TODO: Handle the response
    }
  }

  category = {
    getCategory: async (categoryId: string) => {
      const response = await this.communicator.get(`/category/${categoryId}`);
      return response;
    },
    deleteCategory: async (categoryId: string) => {
      const response = await this.communicator.delete(`/category/${categoryId}`);
      return response;
    },
    addCategory: async (categoryData: any) => {
      const response = await this.communicator.post('/category', categoryData);
      return response;
    },
    updateCategory: async (categoryData: any) => {
      const response = await this.communicator.post(`/category/update`, categoryData);
      return response;
    }
  }

  contact = {
    getContact: async (contactId: string) => {
      const response = await this.communicator.get(`/contact/${contactId}`);
      return response;
    },
    deleteContact: async (contactId: string) => {
      const response = await this.communicator.delete(`/contact/${contactId}`);
      return response;
    },
    addContact: async (contactData: any) => {
      const response = await this.communicator.post('/contact/add', contactData);
      return response;
    },
    updateContact: async (contactData: any) => {
      const response = await this.communicator.post(`/contact/update}`, contactData);
      return response;
    }
  }

  event = {
    getEvent: async (eventId: string) => {
      const response = await this.communicator.get(`/event/${eventId}`);
      return response;
    },
    deleteEvent: async (eventId: string) => {
      const response = await this.communicator.delete(`/event/${eventId}`);
      return response;
    },
    addEvent: async (eventData: any) => {
      const response = await this.communicator.post('/event/add', eventData);
      return response;
    },
    updateEvent: async (eventData: any) => {
      const response = await this.communicator.post(`/event/update}`, eventData);
      return response;
    }
  }

  timeline = {
    getTimeline: async (timedata: any) => {
      const response = await this.communicator.get(`/timeline`, timedata);
      return response;
    }
  }

  user = {
    addUser: async (firstName: string, lastName: string, username: string, password: string): Promise<User> => {
      const response = await this.communicator.post<UserResponse>('/user/add', {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      });
      return response.user;
    },

    updateUser: async (firstName: string, lastName: string, username: string, password: string): Promise<void> => {
      const response = await this.communicator.post<BasicResponse>('/user/update', {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      });
      return;
    }
  }
}

type AuthToken = {
  token: string;
  username: string;
}
