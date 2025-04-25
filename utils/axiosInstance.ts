// axiosInstance.ts

import axios from "axios";

const BASE_URL = "http://89.117.36.172:3000/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
