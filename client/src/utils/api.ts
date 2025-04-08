import axios from 'axios';
import { IAuthResponse } from '../models/auth';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_URL}/api`,
  timeout: 1000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalReq._isRetry = true;
      try {
        const { data } = await axios.get<IAuthResponse>(
          `${import.meta.env.VITE_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('token', data.accessToken);
        return api.request(originalReq);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  }
);

export default api;
