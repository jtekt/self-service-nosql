export const {
  MONGODB_CONNECTION_STRING = "mongodb://loclahost:27017?authSource=admin",

  SESSION_COOKIE_NAME = "self_service_nosql_session",
  SESSION_SECRET = "",

  // TODO: should not need those two
  JWT_SECRET = "sh...",
  TOKEN_COOKIE_NAME = "self_service_nosql_token",
} = process.env;

export const encodedJwtSecret = new TextEncoder().encode(JWT_SECRET);
export const mongoDbConectionString = MONGODB_CONNECTION_STRING;

// UNUSED FOR NOW
export const redactedConnectionString = mongoDbConectionString.replace(
  /:.*@/,
  "://<USERNAME>:<PASSWORD>@"
);
