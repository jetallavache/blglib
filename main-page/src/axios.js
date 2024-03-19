import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL_API // <---DEV   //НАСТРОИТЬ WEBPACK
  baseURL: 'http://api.blglib.ru'                // <---PROD
  // baseURL: 'http://api-blglib:4000'           // ПРОВЕРИТЬ
});

export default instance;