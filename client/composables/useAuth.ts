import isNil from "lodash/isNil"
import { getExpiredAt, getAccessToken } from "~/utils/auth"

export const useAuth = () => {
  const accessToken = getAccessToken()
  const expiredAt = getExpiredAt()

  return {
    isAuthenticated: !!accessToken,
    isExpired: isNil(expiredAt) ? false : Number(expiredAt) <= new Date().getTime()
  }
}
