import CODE from "~/constants/code"
import HTTP from "~/constants/http"

// Auth
export const ACCESS_TOKEN = "authorization"
export const API_KEY = "x-api-key"
export const USER_ID = "x-client-id"
export const REFRESH_TOKEN = "x-r-token-id"
export const EXPIRED_AT = "expired-at"
export const REMEMBERED_USER = "remembered-user"
export const USER_LOGGED_AT = "user-logged-at"

export const RENEW_TOKEN_ENDPOINT = "/user/renew-token"

export default {
  CODE,
  HTTP
}
