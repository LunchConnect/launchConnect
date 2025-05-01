// axiosInstance.ts

import axios from "axios";

// 👇 Use relative baseURL to let Next.js proxy handle it
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
