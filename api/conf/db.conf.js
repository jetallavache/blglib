const {
    M_USERNAME,
    M_PASSWORD,
    M_HOSTNAME,
    M_PORT,
    M_DATABASE,
  } = process.env;
  
export const url = `mongodb://${M_USERNAME}:${M_PASSWORD}@${M_HOSTNAME}:${M_PORT}/${M_DATABASE}?authSource=admin`;

// export const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/?authMechanism=DEFAULT&authSource=${DB_NAME}`;