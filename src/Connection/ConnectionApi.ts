import axios from "axios";
import { API_URL, API_KEY, API_TOKEN } from "./config.js";

export const getConnectionApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_TOKEN}`,
  },
  params: {
    "api-key": API_KEY,
    "language": "en-US",
    "include_adult":true
  },
});
