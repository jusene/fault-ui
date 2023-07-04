import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { config } from "./config";
import qs from "qs";
import { ElMessage } from "element-plus";
import localCache from "@/utils/cache";

const { result_code } = config;

class httpRequest {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (
          config.method === "post" &&
          (config.headers as AxiosRequestHeaders)["Content-Type"] ===
            "application/x-www-form-urlencoded"
        ) {
          config.data = qs.stringify(config.data);
        }
        if (config.url != "/login") {
          (config.headers as AxiosRequestHeaders).Authorization =
            "Bearer " + localCache.getCache("token");
        }
        // get参数编码
        if (config.method === "get" && config.params) {
          let url = config.url as string;
          url += "?";
          const keys = Object.keys(config.params);
          for (const key of keys) {
            if (config.params[key] != void 0 && config.params[key] != null) {
              url += `${key}=${encodeURIComponent(config.params[key])}&`;
            }
          }
          url = url.substring(0, url.length - 1);
          config.params = {};
          config.url = url;
        }
        return config;
      },
      (error: AxiosError) => {
        console.log(error);
        ElMessage.error(error.message);
        Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse<any>): AxiosResponse<any> => {
        if (response.config.responseType === "blob") {
          // 如果是文件流，直接过
          return response;
        } else if (response.status === result_code) {
          return response;
        } else {
          ElMessage.error(response.statusText);
          return response;
        }
      },
      (error: AxiosError) => {
        console.log("err" + error); // for debug
        ElMessage.error(error.message);
        return Promise.reject(error);
      }
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<AxioResult<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<AxioResult<T>>>(config)
        .then((res) => {
          resolve(res as any as Promise<AxioResult<T>>);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default httpRequest;
