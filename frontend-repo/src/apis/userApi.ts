// src/apis/userApi.ts
import axios from "axios";
import { User } from "@/interfaces/user";

const API_URL = "http://localhost:5000/api";

// Creating an axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchAllUsersApi = () => {
  return apiClient.get("/fetch-user-data");
};

export const fetchUserDetailsApi = (userId: string) => {
  return apiClient.get(`/fetch-user-data/${userId}`);
};

export const updateUserDataApi = (userId: string, userData: Partial<User>) => {
  return apiClient.post(`/update-user-data/${userId}`, userData);
};
