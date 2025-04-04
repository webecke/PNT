import { ServerError } from "@/service/server/ServerError";

/**
 * ServerCommunicator
 *
 * A service responsible for handling all HTTP communications between
 * the frontend application and the backend server.
 */
export class ServerCommunicator {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  /**
   * Creates a new ServerCommunicator instance.
   *
   * @param baseUrl - The base URL for all API requests (if not provided, will be determined by environment)
   */
  constructor(baseUrl?: string) {
    if (!baseUrl) {
      baseUrl = this.getApiBaseUrl();
    }

    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Determines the API base URL based on environment
   * This handles both server-side and client-side rendering in Next.js
   */
  private getApiBaseUrl(): string {
    if (typeof window !== 'undefined') {
      // Client-side
      if (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8080';
      }
    } else {
      // Server-side
      const isDev = process.env.NODE_ENV === 'development';
      if (isDev) {
        return 'http://localhost:8080';
      }
    }

    // Default to production URL
    return 'https://pnt-backend-19046648310.us-west2.run.app';
  }

  /**
   * Makes a GET request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to request
   * @param authToken - Optional authentication token
   * @returns A promise with the response data
   */
  async get<T>(endpoint: string, authToken?: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('GET', url, null, authToken);
  }

  /**
   * Makes a POST request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to request
   * @param body - Object to serialize as JSON in the request body
   * @param authToken - Optional authentication token
   * @returns A promise with the response data
   */
  async post<T, U = any>(endpoint: string, body: U, authToken?: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('POST', url, body, authToken);
  }

  /**
   * Makes a PUT request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to request
   * @param body - Object to serialize as JSON in the request body
   * @param authToken - Optional authentication token
   * @returns A promise with the response data
   */
  async put<T, U = any>(endpoint: string, body: U, authToken?: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('PUT', url, body, authToken);
  }

  /**
   * Makes a DELETE request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to request
   * @param authToken - Optional authentication token
   * @returns A promise with the response data
   */
  async delete<T>(endpoint: string, authToken?: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('DELETE', url, null, authToken);
  }

  /**
   * Core method to make HTTP requests.
   *
   * @param method - The HTTP method
   * @param url - The full URL
   * @param body - Object to serialize as JSON in the request body
   * @param authToken - Optional authentication token
   * @returns A promise with the response data
   */
  private async request<T>(
    method: string,
    url: string,
    body: any = null,
    authToken?: string
  ): Promise<T> {
    const requestHeaders = { ...this.defaultHeaders };

    if (authToken) {
      requestHeaders['Authorization'] = `Bearer ${authToken}`;
    }

    const options: RequestInit = {
      method,
      headers: requestHeaders,
      mode: 'cors',
      credentials: 'omit', //TODO: update CORS correctly
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    try {
      console.log(`API Request: ${method} ${url}`, {
        headers: requestHeaders,
        body: body ? body : undefined
      });

      const response = await fetch(url, options);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.translateToServerError(error);
    }
  }

  /**
   * Handles the API response.
   *
   * @param response - The fetch Response object
   * @returns The parsed response data
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await this.parseResponseData(response);
      } catch (e) {
        errorData = { message: 'Could not parse error response', origin: e };
      }

      const requestUrl = response.url;
      const errorInfo = {
        url: requestUrl,
        status: response.status,
        statusText: response.statusText,
        errorData
      };

      console.error('Server Response Error:', errorInfo);

      throw new ServerError(
        response.status,
        response.statusText,
        errorData,
        requestUrl
      );
    }

    return this.parseResponseData(response) as Promise<T>;
  }

  /**
   * Parses the response data based on content type.
   *
   * @param response - The fetch Response object
   * @returns The parsed response data
   */
  private async parseResponseData(response: Response): Promise<any> {
    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('application/json')) {
      return response.json();
    } else if (contentType.includes('text/')) {
      return response.text();
    } else if (contentType.includes('application/octet-stream')) {
      return response.blob();
    }

    return response.text();
  }

  /**
   * Handles errors from the fetch request.
   *
   * @param error - The error object
   * @throws The processed error
   */
  private translateToServerError(error: any) {
    const errorInfo = {
      message: error.message || 'Unknown error',
      type: error.constructor.name,
      stack: error.stack
    };

    console.error('API Request Error:', errorInfo);

    if (error instanceof ServerError) {
      throw error;
    }

    throw new ServerError(
      0,
      'Network Error',
      { message: error.message || 'An unknown error occurred', originalError: errorInfo }
    );
  }

  /**
   * Builds the full URL.
   *
   * @param endpoint - The API endpoint
   * @returns The full URL string
   */
  private buildUrl(endpoint: string): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${normalizedEndpoint}`;
  }
}
