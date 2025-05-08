import axios from "axios";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordCredentials,
} from "../types/auth";

const API_URL = "https://second-brain-web.onrender.com/api";

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const forgotPassword = async (
  credentials: ForgotPasswordCredentials
): Promise<void> => {
  await axios.post(`${API_URL}/auth/forgot-password`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
