import axios from "axios";

const BASE_URL = "https://launch-connects.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
