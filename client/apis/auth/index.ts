import type { AxiosRequestConfig } from "axios"
import type { NuxtError } from "nuxt/app"
import { STATUS_CODE } from "~/constants/code"
import { DEFAULT_URI, SIGN_IN_URI } from "~/constants/route"
import { clearUserCredential, setAccessToken, setRefreshToken, setUserId } from "~/utils/auth"

type UserInfo = {
  user: {
    _id: string
    name: string
    email: string
  }
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export const login = async (payload?: any, config: AxiosRequestConfig<UserInfo> = {}) => {
  try {
    const { data } = await useApi<UserInfo>(config).post("user/login", payload)
    if (data.metadata && data.status === STATUS_CODE.OK) {
      const { tokens, user } = data.metadata
      setAccessToken(tokens.accessToken)
      setRefreshToken(tokens.refreshToken)
      setUserId(user._id)

      navigateTo(DEFAULT_URI)
    } else {
      clearUserCredential()
    }
    return data
  } catch (error) {
    showError(error as NuxtError)
  }
}

export const autoLogout = () => {
  clearUserCredential()
  navigateTo(SIGN_IN_URI)
}

export const healthCheck = async (_?: any, config: AxiosRequestConfig = {}) => {
  try {
    await useApi(config).get("/health-check")
  } catch (error) {
    showError(error as NuxtError)
  }
}
