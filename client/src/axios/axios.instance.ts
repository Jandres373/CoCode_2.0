import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosHeaderValue,
} from 'axios';

interface RawAxiosHeaders {
  [key: string]: AxiosHeaderValue;
}

interface AxiosInstanceOptions {
  baseURL?: string;
  headers?: Partial<RawAxiosHeaders>;
}

export class Axios {
  private instance: AxiosInstance;

  constructor(options: AxiosInstanceOptions = {}) {
    const headers: RawAxiosHeaders = {
      Authorization: options.headers?.Authorization || '',
    };

    this.instance = axios.create({
      baseURL: options.baseURL || process.env.BASE_URL,
      headers,
    });
  }

  public setToken(token: string) {
    if (token) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return { message: 'Token set correctly.' };
    } else {
      return { message: 'There is no token' };
    }
  }

  public getToken() {
    const authorizationHeader = this.instance.defaults.headers.common.Authorization;
  
    if (authorizationHeader && typeof authorizationHeader === 'string') {
      const bearerToken: string = authorizationHeader.split(" ")[1];
      return bearerToken;
    } else {
      throw new Error('Token not found in Authorization header.');
    }
  }

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.instance[method]<T>(path, data, config);
    return response.data;
  }

  public get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('get', path, undefined, config);
  }

  public post<T>(path: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('post', path, data, config);
  }

  public put<T>(path: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('put', path, data, config);
  }

  public delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('delete', path, undefined, config);
  }
}

export const baseConfig: AxiosInstanceOptions = {
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: ``
  },
};

const API = new Axios(baseConfig);
export default API;
