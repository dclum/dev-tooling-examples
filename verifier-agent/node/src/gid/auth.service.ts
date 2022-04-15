import { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from '../utils/axios'
import { HttpMimeType, HttpMethod, GrantType } from '../types'
import { IAuthClient } from './auth.interface'

export class AuthClient implements IAuthClient {
  constructor(private readonly clientId: string, private readonly clientSecret: string) {}

  async getAppAccessToken(): Promise<string> {
    interface Request {
      client_id: string
      client_secret: string
      grant_type: GrantType
    }

    interface Response {
      access_token: string
      expires_in: number
      scope: string
      token_type: string
    }

    const requestConfig: AxiosRequestConfig<Request> = {
      method: HttpMethod.Post,
      url: '/v1/auth/token',
      headers: {
        'Content-Type': HttpMimeType.ApplicationJSON,
        'Accept': HttpMimeType.ApplicationJSON,
      },
      data: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: GrantType.ClientCredentials,
      }
    }

    const response: AxiosResponse<Response, any> = await axios(requestConfig)
    return response.data.access_token
  }
}
