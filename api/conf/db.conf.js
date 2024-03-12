const {
    M_USERNAME,
    M_PASSWORD,
    M_HOSTNAME,
    M_PORT,
    M_DATABASE,
  } = process.env;
  
export const url = `mongodb://${M_USERNAME}:${M_PASSWORD}@${M_HOSTNAME}:${M_PORT}/${M_DATABASE}?authMechanism=DEFAULT&authSource=${M_DATABASE}`;
