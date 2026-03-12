import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./authTypes";
import type { User } from "./authTypes";

const STORAGE_KEY = "dashboard_auth";
const USERS_KEY = "dashboard_users";

// Helper to get initial user from localStorage
function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;
  const storedAuth = localStorage.getItem(STORAGE_KEY);
  if (storedAuth) {
    try {
      return JSON.parse(storedAuth);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to simulate checking auth
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getStoredUsers = (): Record<
    string,
    { password: string; user: User }
  > => {
    const users = localStorage.getItem(USERS_KEY);
    if (users) {
      try {
        return JSON.parse(users);
      } catch {
        return {};
      }
    }
    return {};
  };

  const saveUser = (email: string, password: string, userData: User) => {
    const users = getStoredUsers();
    users[email.toLowerCase()] = { password, user: userData };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = getStoredUsers();
    const storedUser = users[email.toLowerCase()];

    if (!storedUser) {
      return { success: false, error: "No account found with this email" };
    }

    if (storedUser.password !== password) {
      return { success: false, error: "Incorrect password" };
    }

    setUser(storedUser.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedUser.user));
    return { success: true };
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = getStoredUsers();

    if (users[email.toLowerCase()]) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        name
      )}&backgroundColor=04e8c7`,
    };

    saveUser(email, password, newUser);
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
