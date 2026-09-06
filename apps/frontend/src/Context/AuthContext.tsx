import { useEffect, useState, createContext, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { authApi } from "../lib/endpoints";
import { ApiRequestError } from "../lib/api";

// 1. Create Context
interface AuthContextType {
  userData: any;
  isLoggedIn: boolean;
  isDarkMode: boolean;
  isAuthLoading: boolean;
  toggleTheme: () => void;
  login: (email: string, password: string) => Promise<any>;
  register: (data: { name: string; email: string; password: string; branch?: string; year?: number }) => Promise<any>;
  handleLogout: () => Promise<void>;
  refreshMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAuthLoading } = useAuth();
  if (isAuthLoading) return null; // avoid flashing a redirect while session check is in flight
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

// 2. Create Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("dsai-theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dsai-theme", "dark");
    }

    // Restore session from the HTTP-only auth cookie set by the backend.
    // We no longer trust localStorage for user identity — only as a UI cache.
    (async () => {
      try {
        const res = await authApi.me();
        setUserData(res.data);
        setIsLoggedIn(true);
      } catch {
        setUserData(null);
        setIsLoggedIn(false);
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("dsai-theme", newTheme ? "dark" : "light");
  };

  const login = async (email: string, password: string) => {
    console.log('Attempting login in auth :', { email, password });
    const res = await authApi.login({ email, password });
    setUserData(res.data);
    setIsLoggedIn(true);
    return res.data;
  };

  const register = async (data: { name: string; email: string; password: string; branch?: string; year?: number }) => {
    const res = await authApi.register(data);
    setUserData(res.data);
    setIsLoggedIn(true);
    return res.data;
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // even if the network call fails, clear local state so the UI reflects logged-out
    }

    setUserData(null);
    setIsLoggedIn(false);

    if (typeof window !== 'undefined') {
      window.location.assign('/');
    }
  };

  const refreshMe = async () => {
    try {
      const res = await authApi.me();
      setUserData(res.data);
      setIsLoggedIn(true);
    } catch {
      setUserData(null);
      setIsLoggedIn(false);
    }
  };

  // 3. Value passed to consumers
  const authValue = {
    userData,
    isLoggedIn,
    isDarkMode,
    isAuthLoading,
    toggleTheme,
    login,
    register,
    handleLogout,
    refreshMe,
  };
  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export { ApiRequestError };
