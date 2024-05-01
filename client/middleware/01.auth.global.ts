import { autoLogout, healthCheck } from "~/apis/auth"
import { DEFAULT_URI, SIGN_IN_URI } from "~/constants/route"
import { getAccessToken } from "~/utils/auth"

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return

  const accessToken = getAccessToken()
  const { isAuthenticated, isExpired } = useAuth()

  if (to.path === SIGN_IN_URI) return accessToken ? DEFAULT_URI : undefined

  const navigateToSignIn = () => {
    autoLogout()
    return navigateTo(SIGN_IN_URI)
  }

  const healthCheckToken = async () => {
    if (accessToken) {
      // call api health check token, if token invalid call func navigateToSignIn
      await healthCheck()
    } else {
      return navigateToSignIn()
    }
  }

  return !isAuthenticated || isExpired ? navigateToSignIn() : healthCheckToken()
})
