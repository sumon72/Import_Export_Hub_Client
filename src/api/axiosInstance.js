import axios from "axios";

const API_BASE_URL = "https://import-export-hub-server-two.vercel.app";
//const API_BASE_URL = "http://localhost:4000";
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export default api;
