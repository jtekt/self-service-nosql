export const {
  DB_HOST = "localhost",
  DB_PORT = "5432",
  JWT_SECRET = "sh...",
  TOKEN_COOKIE_NAME = "self_service_nosql_token",
  SESSION_COOKIE_NAME = "self_service_nosql_session",
  SESSION_SECRET = "",
} = process.env

export const encodedJwtSecret = new TextEncoder().encode(JWT_SECRET)
