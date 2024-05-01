import { defu } from "defu"
import { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios"

import { DEFAULT_URL } from "~/constants/http"
import CustomError from "~/utils/core/error"
import http from "~/configs/http"
import { getApiKey, setApiKey } from "~/utils/localStorage"
import {
  ACCESS_TOKEN,
  API_KEY,
  EXPIRED_AT,
  REFRESH_TOKEN,
  REMEMBERED_USER,
  RENEW_TOKEN_ENDPOINT,
  USER_ID,
  USER_LOGGED_AT
} from "~/constants"
import { autoLogout } from "~/apis/auth"
import {
  getAccessToken,
  getExpiredAt,
  getRefreshToken,
  getRememberedUser,
  getUserId,
  getUserLoggedAt,
  setAccessToken,
  setRefreshToken
} from "~/utils/auth"
import cloneDeep from "lodash/cloneDeep"
import { REASON_STATUS_CODE, STATUS_CODE } from "~/constants/code"
import { SIGN_IN_URI } from "~/constants/route"

export const useApi = <T>(options: AxiosRequestConfig<T> = {}) => {
  // z: this code below just a test, api key must be set in BE
  setApiKey()
  const { start, end } = useLoadingStore()

  try {
    const runtime_config = useRuntimeConfig()

    // this overrides the default key generation, which includes a hash of
    // url, method, headers, etc. - this should be used with care as the key
    // is how Nuxt decides how responses should be deduplicated between
    // client and server
    http.interceptors.request.use((config) => {
      start()
      // set user token if connected
      config.baseURL = (runtime_config.public.baseUrl as string) ?? DEFAULT_URL
      const CUR_API_KEY = getApiKey()
      const CUR_ACCESS_TOKEN = getAccessToken()
      const CUR_USER_ID = getUserId()
      const CUR_EXPIRED_AT = getExpiredAt()
      const CUR_USER_LOGGED_AT = getUserLoggedAt()
      const CUR_REMEMBERED_USER = getRememberedUser()
      if (CUR_API_KEY) config.headers[API_KEY] = CUR_API_KEY
      if (CUR_ACCESS_TOKEN) config.headers[ACCESS_TOKEN] = CUR_ACCESS_TOKEN
      if (CUR_USER_ID) config.headers[USER_ID] = CUR_USER_ID
      if (CUR_EXPIRED_AT) config.headers[EXPIRED_AT] = CUR_EXPIRED_AT
      if (CUR_USER_LOGGED_AT) config.headers[USER_LOGGED_AT] = CUR_USER_LOGGED_AT
      if (CUR_REMEMBERED_USER) config.headers[REMEMBERED_USER] = CUR_REMEMBERED_USER
      // for nice deep defaults, please use unjs/defu
      const myConfig = defu(options, config) as InternalAxiosRequestConfig<any>
      return myConfig
    })

    http.interceptors.response.use(
      (res) => {
        end()
        return res
      },
      async (err) => {
        if (!err) return Promise.reject()
        const error = cloneDeep(err)
        end()
        const originalRequest = error.config

        // refresh token has been expired
        if (error.response?.status === 401 && originalRequest.url === RENEW_TOKEN_ENDPOINT) {
          autoLogout()
          window.location.reload()
          return Promise.reject()
        } else if (error.response?.status === 401 && !originalRequest.retry) {
          setAccessToken("")
          originalRequest.retry = true
          const refreshToken = getRefreshToken()
          if (refreshToken) {
            const CUR_REFRESH_TOKEN = getRefreshToken()
            http.defaults.headers[REFRESH_TOKEN] = CUR_REFRESH_TOKEN
            const res = await http.post(RENEW_TOKEN_ENDPOINT)
            if (res.data && (res.status === STATUS_CODE.OK || res.status === STATUS_CODE.CREATED)) {
              const { metadata } = res.data
              setAccessToken(metadata.tokens.accessToken)
              setRefreshToken(metadata.tokens.refreshToken)
              http.defaults.headers[REFRESH_TOKEN] = "" // remove rf-tkn from header
              // re-call the original api with the config
              // which was added necessary fields in the first calls
              return http(originalRequest)
            }
          } else if (originalRequest.url && originalRequest.url.indexOf(SIGN_IN_URI) !== -1) {
            // if url is login - it means that credential is invalid
            error.code = 401
            error.type = REASON_STATUS_CODE.UNAUTHORIZED
            return Promise.reject(error)
          }
          autoLogout()
          return Promise.reject()
        }
        return Promise.reject(error)
      }
    )

    return http
  } catch (error) {
    end()
    throw Promise.reject(new CustomError(error))
  }
}
