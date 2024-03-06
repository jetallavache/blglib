const {
    DB_USER,
    DB_PASSWORD,
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
  } = process.env;
  
export const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}?authSource=admin`;

// export const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/?authMechanism=DEFAULT&authSource=${DB_NAME}`;