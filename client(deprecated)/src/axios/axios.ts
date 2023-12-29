import config from '../../.storybook/main'
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosHeaderValue,
} from 'axios'

interface RawAxiosHeaders {
  Accept: AxiosHeaderValue
  'Content-Length': AxiosHeaderValue
  'User-Agent': AxiosHeaderValue
  'Content-Encoding': AxiosHeaderValue
  'Content-Type': AxiosHeaderValue
  Authorization: AxiosHeaderValue
  // Agrega otras propiedades según sea necesario
}

interface AxiosInstanceOptions {
  baseURL?: string
  headers?: Partial<RawAxiosHeaders> //TODO revisar el tipado correcto aquí
}
export class Axios {
  private instance: AxiosInstance

  constructor(options: AxiosInstanceOptions = {}) {
    const headers = {}

    this.instance = axios.create({
      baseURL: options.baseURL || process.env.BASE_URL,
      headers,
    })

    // Configurar interceptores u otras configuraciones si es necesario
  }

  private getToken() {
    const token = this.instance.defaults.headers.common.Authorization
    if (token) return token
  }

  async get<T>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.instance.get<T>(path, config)
  }

  async post<T>(
    path: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.instance.post<T>(path, data, config)
  }

  async put<T>(
    path: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.instance.put<T>(path, data, config)
  }

  async delete<T>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.instance.delete<T>(path, config)
  }

  redefineConfig(options: AxiosInstanceOptions = {}): void {
    this.instance.defaults.baseURL = options.baseURL || process.env.BASE_URL
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      /* options.headers, */
    }
  }

  assignToken(token: string): any {
    try {
      if (
        !this.instance.defaults.headers ||
        !this.instance.defaults.headers.common
      ) {
        throw new Error('Headers are not properly configured.')
      }

      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`

      // Verificar que el token se haya asignado correctamente
      const authorization = this.instance.defaults.headers.common.Authorization
      console.log(authorization)
      if (!authorization || !authorization.startsWith('Bearer')) {
        throw new Error('Failed to assign the token.')
      }

      const response = { success: 'Token set correctly' }
      return response
    } catch (error: any) {
      console.error('Error in assignToken:', error.message)
      throw { fail: 'Token was not set', error }
    }
  }

  async getUserData() {
    const token = String(this.getToken()) // Asegurar que sea una cadena

    try {
      const res = await fetch(`${process.env.BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      const user = await res.json()
      Object.defineProperty(this.instance, 'userData', { user, token })
      return { user, token }
    } catch (error: any) {
      console.error('Error fetching user data:', error.message)
    }
  }
}

export const baseConfig: AxiosInstanceOptions = {
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

const API = new Axios(baseConfig)
export default API
