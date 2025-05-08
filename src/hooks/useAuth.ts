import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";
import * as authApi from "../api/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await authApi.login(credentials);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } catch (error) {
        throw error;
      }
    },
    [navigate]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        const response = await authApi.register(credentials);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } catch (error) {
        throw error;
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };
};
