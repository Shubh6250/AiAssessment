import axios from "axios";
import { useLoading } from "../context/LoadingContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const { setLoading } = useLoading();
    setLoading(true);
    return config;
  },
  (error) => {
    const { setLoading } = useLoading();
    setLoading(false);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    const { setLoading } = useLoading();
    setLoading(false);
    return response;
  },
  (error) => {
    const { setLoading } = useLoading();
    setLoading(false);
    return Promise.reject(error);
  }
);

export default api;
