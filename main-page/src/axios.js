import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
  // baseURL: 'http://localhost:4000/api',
});

export default instance;



// co=uo.create({baseURL:{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_BASE_URL_API})