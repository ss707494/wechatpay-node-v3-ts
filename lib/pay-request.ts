import axios, { AxiosRequestConfig } from 'axios';
import { Output } from './interface-v2';
import { IPayRequest } from './pay-request.interface';

export class PayRequest implements IPayRequest {
  async post(url: string, params: Record<string, any>, headers: Record<string, any>): Promise<Output> {
    try {
      const config: AxiosRequestConfig = {
        headers: headers,
      };
      const result = await axios.post(url, params, config);
      return {
        status: result.status,
        data: result.data,
      };
    } catch (error: any) {
      return {
        status: error.response.status,
        errRaw: error,
        error: error.response?.data,
      };
    }
  }

  async get(url: string, headers: Record<string, any>): Promise<Output> {
    try {
      const config: AxiosRequestConfig = {
        headers: headers,
      };
      const result = await axios.get(url, config);

      let data: any = {};
      if (result.headers['content-type'] === 'text/plain') {
        data = {
          status: result.status,
          data: result.data,
        };
      } else {
        data = {
          status: result.status,
          data: result.data,
        };
      }

      return data;
    } catch (error: any) {
      return {
        status: error.response.status,
        errRaw: error,
        error: error.response?.data,
      };
    }
  }
}
