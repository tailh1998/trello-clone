export const WHITELIST_DOMAINS = ["http://localhost:3003", "http://localhost:5555"]

export const ENVIRONMENT = {
  DEV: "development",
  PRODUCTION: "production"
} as const

export const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "x-r-token-id"
} as const

export const BOARD_TYPES = {
  PUBLIC: "public",
  PRIVATE: "private"
} as const
