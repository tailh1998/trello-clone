import dayjs from "dayjs"

import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REMEMBERED_USER,
  EXPIRED_AT,
  USER_LOGGED_AT,
  USER_ID
} from "~/constants"

export const clearUserCredential = () => {
  clearAccessToken()
  clearExpiredAt()
  clearRefreshToken()
  clearUserId()
  removeUserLoggedAt()
}

// access token
export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken)
  localStorage.setItem(USER_LOGGED_AT, dayjs().valueOf().toString())
}

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN)

export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN)

export const getUserLoggedAt = () => localStorage.getItem(USER_LOGGED_AT)

export const removeUserLoggedAt = () => localStorage.removeItem(USER_LOGGED_AT)

// refresh token
export const setRefreshToken = (refreshToken: string) =>
  localStorage.setItem(REFRESH_TOKEN, refreshToken)

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN)

export const clearRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN)

// expired at
export const setExpiredAt = (timestamp: number) =>
  localStorage.setItem(EXPIRED_AT, dayjs().add(timestamp, "hour").valueOf().toString())

export const getExpiredAt = () => localStorage.getItem(EXPIRED_AT)

export const clearExpiredAt = () => localStorage.removeItem(EXPIRED_AT)

export const setRememberFeature = (isRemember: Boolean, userName: string) => {
  if (isRemember) {
    localStorage.setItem(REMEMBERED_USER, userName)
  } else {
    localStorage.removeItem(REMEMBERED_USER)
  }
}

export const getRememberedUser = () => localStorage.getItem(REMEMBERED_USER)

export const setUserId = (id: string) => localStorage.setItem(USER_ID, id)

export const getUserId = () => localStorage.getItem(USER_ID)

export const clearUserId = () => localStorage.removeItem(USER_ID)
