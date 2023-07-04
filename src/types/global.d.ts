declare type AxiosHeaders =
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data";

declare type AxiosMethod = "get" | "post" | "delete" | "put";

declare type AxiosResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

declare interface AxioResult<T = any> {
  [x: string]: any[] | undefined;
  code: number | string;
  config: T;
  data: T;
  headers: T;
  status: number;
  statusText: string;
}
