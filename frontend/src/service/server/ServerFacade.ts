/**
 * ServerFacade
 *
 * A service that provides a simplified interface for all backend API interactions.
 * Acts as a facade over the ServerCommunicator, organizing endpoints by domain
 * and handling data transformation between API and application models.
 */
import { ServerCommunicator } from './ServerCommunicator';
import { AddUserResponse, UserRequest } from "@/service/server/message/UserMessage";
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
  private authToken: AuthToken | null = null;

  constructor() {
    this.communicator = new ServerCommunicator();
  }

  /**
   * Helper function to ensure a token exists before making authenticated requests
   * @throws Error if no token is available
   * @returns The current authentication token
   */
  private requireToken(): string {
    if (!this.authToken) {
      throw new Error("Authentication required");
    }
    return this.authToken.token;
  }

  auth = {
    login: async (username: string, password: string): Promise<boolean> => {
      const request: LoginRequest = { username, password }
      const response = await this.communicator.post<AuthResponse>('/auth/login', request)
      this.authToken = { token: response.authtoken, username: username }
      console.log(response)
      return response.success
    },

    logout: async (): Promise<boolean> => {
      if (!this.authToken) {
        console.error("Tried to log out, but no one is logged in on this device.")
        return false;
      }
      const request = { username: this.authToken.username }
      const response = await this.communicator.post<BasicResponse>('/auth/login', request, this.authToken.token)
      this.authToken = null;
      return response.success
    }
  }

  category = {
    getCategory: async (categoryId: string): Promise<GetCategoryResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.get<GetCategoryResponse>(
        `/category/${categoryId}`,
        authToken
      );
      return response;
    },

    deleteCategory: async (categoryId: string): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.delete<BasicResponse>(
        `/category/${categoryId}`,
        authToken
      );
      return response;
    },

    addCategory: async (label: string): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const request: AddCategoryRequest = { label };
      const response = await this.communicator.post<BasicResponse>(
        '/category/add',
        request,
        authToken
      );
      return response;
    },

    updateCategory: async (id: string, label: string): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const request: UpdateCategoryRequest = { id, label };
      const response = await this.communicator.post<BasicResponse>(
        '/category/update',
        request,
        authToken
      );
      return response;
    }
  }

  contact = {
    getContact: async (contactId: string): Promise<GetContactResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.get<GetContactResponse>(
        `/contact/${contactId}`,
        authToken
      );
      return response;
    },

    deleteContact: async (contactId: string): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.delete<BasicResponse>(
        `/contact/${contactId}`,
        authToken
      );
      return response;
    },

    addContact: async (contactData: AddContactRequest): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.post<BasicResponse>(
        '/contact/add',
        contactData,
        authToken
      );
      return response;
    },

    updateContact: async (contactData: UpdateContactRequest): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.post<BasicResponse>(
        '/contact/update',
        contactData,
        authToken
      );
      return response;
    }
  }


  event = {
    getEvent: async (eventId: string): Promise<GetEventResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.get<GetEventResponse>(
        `/event/${eventId}`,
        authToken
      );
      return response;
    },

    deleteEvent: async (eventId: string): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.delete<BasicResponse>(
        `/event/${eventId}`,
        authToken
      );
      return response;
    },

    addEvent: async (eventData: AddEventRequest): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.post<BasicResponse>(
        '/event/add',
        eventData,
        authToken
      );
      return response;
    },

    updateEvent: async (eventData: UpdateEventRequest): Promise<BasicResponse> => {
      const authToken = this.requireToken();
      const response = await this.communicator.post<BasicResponse>(
        '/event/update',
        eventData,
        authToken
      );
      return response;
    }
  }

  timeline = {
    getTimeline: async (userID: string, categoryIDs: string[], contactIDs: string[]): Promise<TimelineResponse> => {
      const authToken = this.requireToken();

      const request: TimelineRequest = {
        userID,
        categoryIDs,
        contactIDs
      };

      const response = await this.communicator.post<TimelineResponse>(
        '/timeline/',
        request,
        authToken
      );

      return response;
    }
  }

  user = {
    addUser: async (request: UserRequest): Promise<AddUserResponse> => {
      const response = await this.communicator.post<AddUserResponse>(
        '/user/add',
        request
      );

      // If login is successful, set the token
      if (response.success && response.token) {
        this.authToken = { token: response.token, username: request.username };
      }

      return response;
    },

    updateUser: async (request: UserRequest): Promise<BasicResponse> => {
      const authToken = this.requireToken();

      const response = await this.communicator.post<BasicResponse>(
        '/user/update',
        request,
        authToken
      );

      return response;
    }
  }
}

type AuthToken = {
  token: string;
  username: string;
}
