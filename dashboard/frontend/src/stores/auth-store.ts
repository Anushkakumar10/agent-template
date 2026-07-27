import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  username: string;
  full_name?: string | null;
  is_active: boolean;
  created_at: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard_access_token", token);
      localStorage.setItem("dashboard_user", JSON.stringify(user));
    }
    set({ user, accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dashboard_access_token");
      localStorage.removeItem("dashboard_user");
    }
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  initAuth: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("dashboard_access_token");
      const userStr = localStorage.getItem("dashboard_user");
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({ user, accessToken: token, isAuthenticated: true });
        } catch {
          localStorage.removeItem("dashboard_access_token");
          localStorage.removeItem("dashboard_user");
        }
      }
    }
  },
}));
