import { useEffect, useState, createContext, ReactNode,useContext } from "react";
import {Navigate } from "react-router-dom";
// 1. Create Context
interface AuthContextType {
  userData: any
  isLoggedIn: boolean
  isDarkMode: boolean
  toggleTheme: () => void
  handleLogin: (user: any) => void
  handleLogout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}


// 2. Create Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const savedUser = localStorage.getItem("dsai-user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setIsLoggedIn(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("dsai-theme", newTheme ? "dark" : "light");
  };

  const handleLogin = (user: any) => {
    setUserData(user);
    setIsLoggedIn(true);
    localStorage.setItem("dsai-user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem("dsai-user");
  };

  // 3. Value passed to consumers
  const authValue = {
    userData,
    isLoggedIn,
    isDarkMode,
    toggleTheme,
    handleLogin,
    handleLogout,
  };
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
