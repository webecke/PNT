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
   * @param defaultHeaders - Default headers to include with all requests
   */
  constructor(
    baseUrl?: string,
    defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  ) {
    if (!baseUrl) {
      // For Next.js, we use environment variables that are exposed to the browser
      // NEXT_PUBLIC_* variables are available in both server and client contexts
      baseUrl = this.getApiBaseUrl();
    }

    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  /**
   * Determines the API base URL based on environment
   * This handles both server-side and client-side rendering in Next.js
   */
  private getApiBaseUrl(): string {
    // Check for Next.js environment variables
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
   * @param params - Query parameters to include
   * @param headers - Additional headers to include
   * @returns A promise with the response data
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>('GET', url, null, headers);
  }

  /**
   * Makes a POST request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to request
   * @param body - Object to serialize as JSON in the request body
   * @param headers - Additional headers to include
   * @returns A promise with the response data
   */
  async post<T, U = any>(
    endpoint: string,
    body: U,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('POST', url, body, headers);
  }

  /**
   * Makes a PUT request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to request
   * @param body - Object to serialize as JSON in the request body
   * @param headers - Additional headers to include
   * @returns A promise with the response data
   */
  async put<T, U = any>(
    endpoint: string,
    body: U,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('PUT', url, body, headers);
  }

  /**
   * Makes a DELETE request to the specified endpoint.
   *
   * @param endpoint - The API endpoint to request
   * @param params - Query parameters to include
   * @param headers - Additional headers to include
   * @returns A promise with the response data
   */
  async delete<T>(
    endpoint: string,
    params?: Record<string, string>,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>('DELETE', url, null, headers);
  }

  /**
   * Core method to make HTTP requests.
   *
   * @param method - The HTTP method
   * @param url - The full URL
   * @param body - Object to serialize as JSON in the request body
   * @param headers - Additional headers to include
   * @returns A promise with the response data
   */
  private async request<T>(
    method: string,
    url: string,
    body: any = null,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    const options: RequestInit = {
      method,
      headers: requestHeaders,
      mode: 'cors',
      credentials: 'omit', //TODO: update CORS correctly
    };

    if (body !== null) {
      // Simply take the object and serialize it
      options.body = JSON.stringify(body);
    }

    try {
      // Log the request (helpful for debugging)
      console.log(`API Request: ${method} ${url}`, {
        headers: requestHeaders,
        body: body ? body : undefined
      });

      const response = await fetch(url, options);
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
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
      // Get error details from response body
      let errorData;
      try {
        errorData = await this.parseResponseData(response);
      } catch (e) {
        errorData = { message: 'Could not parse error response' };
      }

      // Create a detailed error message
      const requestUrl = response.url;
      const errorInfo = {
        url: requestUrl,
        status: response.status,
        statusText: response.statusText,
        errorData
      };

      // Log the error details
      console.error('Server Response Error:', errorInfo);

      // Throw a detailed ServerError
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
  private handleError<T>(error: any): Promise<T> {
    // Create a detailed error message
    const errorInfo = {
      message: error.message || 'Unknown error',
      type: error.constructor.name,
      stack: error.stack
    };

    // Log the error for debugging purposes
    console.error('API Request Error:', errorInfo);

    // If the error is already a ServerError, just throw it
    if (error instanceof ServerError) {
      throw error;
    }

    // Network errors or other fetch-related errors
    throw new ServerError(
      0,
      'Network Error',
      { message: error.message || 'An unknown error occurred', originalError: errorInfo }
    );
  }

  /**
   * Builds the full URL with query parameters.
   *
   * @param endpoint - The API endpoint
   * @param params - Query parameters to include
   * @returns The full URL string
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    // Ensure endpoint starts with a slash
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = `${this.baseUrl}${normalizedEndpoint}`;

    // Add query parameters if provided
    if (params && Object.keys(params).length > 0) {
      const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      url = `${url}?${queryString}`;
    }

    return url;
  }
}
