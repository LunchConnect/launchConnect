import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = `${API_URL}/api`;

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor
publicRequest.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const accessToken = user?.token;

        if (accessToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing token from localStorage:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
publicRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized, redirecting to login...');
      // Handle token expiry or redirect
    }
    return Promise.reject(error);
  }
);

export default publicRequest;
