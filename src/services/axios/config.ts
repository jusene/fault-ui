const config: {
  base_url: {
    dev: string;
    pro: string;
  };
  result_code: number | string;
  default_headers: AxiosHeaders;
  request_timeout: number;
} = {
  base_url: {
    dev: "http://fault-center.iguming.net/apis",
    pro: "http://fault-center.iguming.net/apis",
  },
  result_code: 200,
  default_headers: "application/json",
  request_timeout: 10000,
};

export { config };
