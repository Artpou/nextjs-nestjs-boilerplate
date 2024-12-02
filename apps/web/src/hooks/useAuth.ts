import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");
  const isAuthenticated = () => !!getToken();

  const getUser = async () => {
    try {
      if (!isAuthenticated()) {
        setUser(null);
        return null;
      }

      const userData = await api("/auth/me");
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      await getUser();
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    getUser,
  };
}
