export const DEFAULT_URL = "localhost:8017/v1/api/"

export const HTTP_METHOD: Config<string> = {
  GET: "GET",
  HEAD: "HEAD",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  CONNECT: "CONNECT",
  OPTIONS: "OPTIONS",
  TRACE: "TRACE",
  PATCH: "PATCH"
}

export const HEADER: Config<{ [key: string]: string }> = {
  CONTENT_TYPE: {
    DEFAULT: "application/json;charset=UTF-8",
    MULTIPART: "multipart/form-data"
  }
}

const TIME = 30000
export const TIME_OUT: Config<number> = {
  DEFAULT: TIME,
  MULTIPART: TIME * 2
}

export default {
  DEFAULT_URL,
  HTTP_METHOD,
  HEADER,
  TIME_OUT
}
