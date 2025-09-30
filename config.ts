export const {
  MONGODB_CONNECTION_STRING = "mongodb://loclahost:27017?authSource=admin",

  SESSION_COOKIE_NAME = "self-service-nosql-session",
  SESSION_SECRET = "pleaseChangeThis",
} = process.env;

export const mongoDbConectionString = MONGODB_CONNECTION_STRING;

// UNUSED FOR NOW
export const redactedConnectionString = mongoDbConectionString.replace(
  /:.*@/,
  "://<USERNAME>:<PASSWORD>@"
);
