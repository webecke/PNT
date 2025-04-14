/**
 * ServerFacade
 *
 * A service that provides a simplified interface for all backend API interactions.
 * Acts as a facade over the ServerCommunicator, organizing endpoints by domain
 * and handling data transformation between API and application models.
 */
import { ServerCommunicator } from './ServerCommunicator';
import { AddUserResponse, UserRequest } from '@/service/server/message/UserMessage';
import { BasicResponse } from '@/service/server/message/BasicResponse';
import { AuthResponse, LoginRequest } from '@/service/server/message/AuthMessage';
import {
  AddCategoryRequest,
  GetCategoryResponse,
  UpdateCategoryRequest,
} from '@/service/server/message/CategoryMessage';
import { AddContactRequest, GetContactResponse } from '@/service/server/message/ContactMessage';
import {
  AddEventRequest,
  GetEventResponse,
  UpdateEventRequest,
} from '@/service/server/message/EventMessage';
import { TimelineRequest, TimelineResponse } from '@/service/server/message/TimelineMessage';
import { Contact } from '@/model/Contact';

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
      throw new Error('Authentication required');
    }
    return this.authToken.token;
  }

  private setAuthToken(authToken: AuthToken | null) {
    this.authToken = authToken;
  }

  public async login(username: string, password: string): Promise<any> {
    const request: LoginRequest = { username, password };
    const response = await this.communicator.post<AuthResponse>('/auth/login', request);
    this.setAuthToken({ token: response.authtoken, username: username });
    console.log(response);
    return response;
  }

  // AUTHENTICATION

  public async logout(): Promise<boolean> {
    if (!this.authToken) {
      console.error('Tried to log out, but no one is logged in on this device.');
      return false;
    }
    const request = { username: this.authToken.username };
    const response = await this.communicator.post<BasicResponse>(
      '/auth/login',
      request,
      this.authToken.token
    );
    this.setAuthToken(null);
    return response.success;
  }

  public async addUser(request: UserRequest): Promise<AddUserResponse> {
    const response = await this.communicator.post<AddUserResponse>('/user/add', request);

    // If login is successful, set the token
    if (response.success && response.token) {
      this.setAuthToken({ token: response.token, username: request.username });
    }

    return response;
  }

  //  CATEGORY

  public async getCategory(categoryId: string): Promise<GetCategoryResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.get<GetCategoryResponse>(
      `/category/${categoryId}`,
      authToken
    );
    return response;
  }

  public async deleteCategory(categoryId: string): Promise<BasicResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.delete<BasicResponse>(
      `/category/${categoryId}`,
      authToken
    );
    return response;
  }

  public async addCategory(label: string): Promise<BasicResponse> {
    const authToken = this.requireToken();
    const request: AddCategoryRequest = { label };
    const response = await this.communicator.post<BasicResponse>(
      '/category/add',
      request,
      authToken
    );
    return response;
  }

  public async updateCategory(id: string, label: string): Promise<BasicResponse> {
    const authToken = this.requireToken();
    const request: UpdateCategoryRequest = { id, label };
    const response = await this.communicator.post<BasicResponse>(
      '/category/update',
      request,
      authToken
    );
    return response;
  }

  //  CONTACT

  public async getContact(contactId: string): Promise<GetContactResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.get<GetContactResponse>(
      `/contact/${contactId}`,
      authToken
    );
    return response;
  }

  public async deleteContact(contactId: string): Promise<BasicResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.delete<BasicResponse>(
      `/contact/${contactId}`,
      authToken
    );
    return response;
  }

  public async addContact(contactData: AddContactRequest): Promise<any> {
    const authToken = this.requireToken();
    const response = await this.communicator.post<any>(
      '/contact/add',
      contactData,
      authToken
    );
    console.log("this is what we got from the backend: ", response);
    return response;
  }

  public async updateContact(contactData: Contact): Promise<BasicResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.post<BasicResponse>(
      '/contact/update',
      contactData,
      authToken
    );
    return response;
  }

  // EVENT

  public async getEvent(eventId: string): Promise<GetEventResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.get<GetEventResponse>(`/event/${eventId}`, authToken);
    return response;
  }

  public async deleteEvent(eventId: string): Promise<BasicResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.delete<BasicResponse>(`/event/${eventId}`, authToken);
    return response;
  }

  public async addEvent(eventData: AddEventRequest): Promise<BasicResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.post<BasicResponse>(
      '/event/add',
      eventData,
      authToken
    );
    return response;
  }

  public async updateEvent(eventData: UpdateEventRequest): Promise<BasicResponse> {
    const authToken = this.requireToken();
    const response = await this.communicator.post<BasicResponse>(
      '/event/update',
      eventData,
      authToken
    );
    return response;
  }

  //  TIMELINE

  public async getTimeline(
    userID: string,
    categoryIDs: string[],
    contactIDs: string[]
  ): Promise<TimelineResponse> {
    const authToken = this.requireToken();

    const request: TimelineRequest = {
      userID,
      categoryIDs,
      contactIDs,
    };

    const response = await this.communicator.post<TimelineResponse>(
      '/timeline/',
      request,
      authToken
    );

    return response;
  }

  // USER

  public async updateUser(request: UserRequest): Promise<BasicResponse> {
    const authToken = this.requireToken();

    const response = await this.communicator.post<BasicResponse>(
      '/user/update',
      request,
      authToken
    );

    return response;
  }
}

type AuthToken = {
  token: string;
  username: string;
};
