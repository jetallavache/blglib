import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL_API
  baseURL: 'https://api.blglib.ru'
});

export default instance;