import { AxiosRequestConfig } from 'axios';

export function authRequestInterceptor() {
  let config: AxiosRequestConfig = {}
  if (config.headers === undefined) {
    config.headers = {};
  }
  config.headers.Accept = 'application/json';
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
}
