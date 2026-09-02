import axios from "axios";
import { persistAuth } from "../auth/persistAuth.ts";
import { mapAxiosErrorToSpecificError } from "./axiosError.ts";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  paramsSerializer: (params: Record<string, unknown>): string => {
    const queryParts: string[] = [];

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        queryParts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        );
      }
    }

    return queryParts.join("&");
  },
});

api.interceptors.request.use(
  (config) => {
    const authenticateUserToken = persistAuth.get();
    if (authenticateUserToken) {
      config.headers.Authorization = `Bearer ${authenticateUserToken.access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(mapAxiosErrorToSpecificError(error)),
);
