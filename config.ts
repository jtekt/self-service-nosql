export const {
  JWT_SECRET = "sh...",
  TOKEN_COOKIE_NAME = "self_service_nosql_token",
  SESSION_COOKIE_NAME = "self_service_nosql_session",
  SESSION_SECRET = "",
  MONGODB_HOST = "loclahost",
  MONGODB_PORT = "27017",
  MONGODB_ADMIN_USERNAME,
  MONGODB_ADMIN_PASSWORD,
} = process.env

export const encodedJwtSecret = new TextEncoder().encode(JWT_SECRET)
export const mongoDbConectionString = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}?directConnection=true&authSource=admin`
