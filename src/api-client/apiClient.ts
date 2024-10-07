import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
