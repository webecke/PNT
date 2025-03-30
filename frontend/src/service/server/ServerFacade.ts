/**
 * ServerFacade
 *
 * A service that provides a simplified interface for all backend API interactions.
 * Acts as a facade over the ServerCommunicator, organizing endpoints by domain
 * and handling data transformation between API and application models.
 */
import { ServerCommunicator } from './ServerCommunicator';
import { UserResponse } from "@/service/server/message/User";
import { User } from "@/model/User";
import { AddUserRequest, AddUserResponse, UpdateUserRequest } from "@/service/server/message/UserMessage";
import { BasicResponse } from "@/service/server/message/BasicResponse";
import { AuthResponse, LoginRequest } from "@/service/server/message/AuthMessage";
import {
  AddCategoryRequest,
  GetCategoryResponse,
  UpdateCategoryRequest
} from "@/service/server/message/CategoryMessage";
import { AddContactRequest, GetContactResponse, UpdateContactRequest } from "@/service/server/message/ContactMessage";
import { AddEventRequest, GetEventResponse, UpdateEventRequest } from "@/service/server/message/EventMessage";
import { TimelineRequest, TimelineResponse } from "@/service/server/message/TimelineMessage";

export class ServerFacade {
  private communicator: ServerCommunicator;
  private token: AuthToken | null = null;

  constructor() {
    this.communicator = new ServerCommunicator();
  }

  auth = {
    login: async (username: string, password: string): Promise<boolean> => {
      const request: LoginRequest = { username, password }
      const response = await this.communicator.post<AuthResponse>('/auth/login', request)
      this.token = { token: response.authtoken, username: username }
      console.log(response)
      return response.success
    },

    logout: async (): Promise<boolean> => {
      if (!this.token) {
        console.error("Tried to log out, but no one is logged in on this device.")
        return false;
      }
      const request = { username: this.token.username }
      const response = await this.communicator.post<BasicResponse>('/auth/login', request, this.token.token)
      this.token = null;
      return response.success
    }
  }

  category = {
    getCategory: async (categoryId: string): Promise<GetCategoryResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.get<GetCategoryResponse>(
        `/category/${categoryId}`,
        this.token.token
      );
      return response;
    },

    deleteCategory: async (categoryId: string): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.delete<BasicResponse>(
        `/category/${categoryId}`,
        this.token.token
      );
      return response;
    },

    addCategory: async (label: string): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const request: AddCategoryRequest = { label };
      const response = await this.communicator.post<BasicResponse>(
        '/category/add',
        request,
        this.token.token
      );
      return response;
    },

    updateCategory: async (id: string, label: string): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const request: UpdateCategoryRequest = { id, label };
      const response = await this.communicator.post<BasicResponse>(
        '/category/update',
        request,
        this.token.token
      );
      return response;
    }
  }

  contact = {
    getContact: async (contactId: string): Promise<GetContactResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.get<GetContactResponse>(
        `/contact/${contactId}`,
        this.token.token
      );
      return response;
    },

    deleteContact: async (contactId: string): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.delete<BasicResponse>(
        `/contact/${contactId}`,
        this.token.token
      );
      return response;
    },

    addContact: async (contactData: AddContactRequest): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.post<BasicResponse>(
        '/contact/add',
        contactData,
        this.token.token
      );
      return response;
    },

    updateContact: async (contactData: UpdateContactRequest): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.post<BasicResponse>(
        '/contact/update',
        contactData,
        this.token.token
      );
      return response;
    }
  }


  event = {
    getEvent: async (eventId: string): Promise<GetEventResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.get<GetEventResponse>(
        `/event/${eventId}`,
        this.token.token
      );
      return response;
    },

    deleteEvent: async (eventId: string): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.delete<BasicResponse>(
        `/event/${eventId}`,
        this.token.token
      );
      return response;
    },

    addEvent: async (eventData: AddEventRequest): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.post<BasicResponse>(
        '/event/add',
        eventData,
        this.token.token
      );
      return response;
    },

    updateEvent: async (eventData: UpdateEventRequest): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }
      const response = await this.communicator.post<BasicResponse>(
        '/event/update',
        eventData,
        this.token.token
      );
      return response;
    }
  }

  timeline = {
    getTimeline: async (userID: string, categoryIDs: string[], contactIDs: string[]): Promise<TimelineResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }

      const request: TimelineRequest = {
        userID,
        categoryIDs,
        contactIDs
      };

      const response = await this.communicator.post<TimelineResponse>(
        '/timeline/',
        request,
        this.token.token
      );

      return response;
    }
  }

  user = {
    addUser: async (firstName: string, lastName: string, username: string, password: string): Promise<AddUserResponse> => {
      const request: AddUserRequest = {
        firstName,
        lastName,
        username,
        password
      };
      const response = await this.communicator.post<AddUserResponse>(
        '/user/add',
        request
      );

      // If login is successful, set the token
      if (response.success && response.token) {
        this.token = { token: response.token, username };
      }

      return response;
    },

    updateUser: async (firstName: string, lastName: string, username: string, password: string): Promise<BasicResponse> => {
      if (!this.token) {
        return { success: false, message: "Authentication required" };
      }

      const request: UpdateUserRequest = {
        firstName,
        lastName,
        username,
        password
      };

      const response = await this.communicator.post<BasicResponse>(
        '/user/update',
        request,
        this.token.token
      );

      return response;
    }
  }
}

type AuthToken = {
  token: string;
  username: string;
}
