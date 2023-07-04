import service from "./service";
import { config } from "./config";
import { AxiosRequestConfig } from "axios";

const { default_headers, request_timeout } = config;

const base_config: AxiosRequestConfig = {
  baseURL:
    config.base_url[process.env.NODE_ENV === "development" ? "dev" : "pro"],
  timeout: request_timeout,
  headers: {
    "Content-Type": default_headers,
  },
};

const http = new service(base_config);

export default {
  get: <T = any>(option: AxiosRequestConfig): Promise<AxioResult<T>> => {
    return http.request({ method: "GET", ...option });
  },
  post: <T = any>(option: AxiosRequestConfig): Promise<AxioResult<T>> => {
    return http.request({ method: "POST", ...option });
  },
  put: <T = any>(option: AxiosRequestConfig): Promise<AxioResult<T>> => {
    return http.request({ method: "PUT", ...option });
  },
  delete: <T = any>(option: AxiosRequestConfig): Promise<AxioResult<T>> => {
    return http.request({ method: "DELETE", ...option });
  },
};
