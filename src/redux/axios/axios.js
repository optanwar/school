import axios from "axios";

const instance = axios.create({
  // baseURL: "https://nodeapp.shrinkcom.com/school-dekho-backend",
  // baseURL: "http://192.168.0.239:6800/",
  baseURL: "http://192.168.0.209:6800/",
});

export default instance;
