import type { AxiosRequestConfig } from "axios"
import axios from "axios"
import { HEADER, TIME_OUT } from "~/constants/http"

const HEADER_CONFIG = {
  "Content-Type": HEADER.CONTENT_TYPE.DEFAULT,
  "Cache-Control": "no-cache, no-store"
  // "Accept-Language": "",
  // "Time-Zone": ""
}

const defaults: AxiosRequestConfig<any> = {
  // this overrides the default key generation, which includes a hash of
  // url, method, headers, etc. - this should be used with care as the key
  // is how Nuxt decides how responses should be deduplicated between
  // client and server
  method: "POST",
  timeout: TIME_OUT.DEFAULT,
  headers: HEADER_CONFIG
}

const http = axios.create(defaults)

export default http
