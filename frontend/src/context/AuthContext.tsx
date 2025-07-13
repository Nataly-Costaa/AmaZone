"use client";

import React, { 
    createContext, 
    useContext,
    useState, 
    useEffect, 
    ReactNode,
    useCallback 
} from "react";
import { User } from "@/types";

import { LoginFormData } from "@/lib/schemas";
import authAPI from "@/lib/api";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginFormData) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({children}:AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
        checkAuth();
        setInitialized(true);
    }  
  }, [initialized]);

  const checkAuth = useCallback(async () => {
    try {
        setLoading(true);
        const response = await authAPI.me();
        setUser(response.user);
    } catch { // catch (error)
        setUser(null);
    } finally {
        setLoading(false);
    }
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    const response = await authAPI.login(data);
    setUser(response.user);
  }, []);

  const logout = useCallback(async () => {
    try {
        await authAPI.logout();
    } catch (error) {
        console.error("Erro no logout: ", error);
    } finally {
        setUser(null);
    }
  }, []);

  const value = React.useMemo (
    () => ({
        user,
        loading,
        login,
        logout,
    }),
    [user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext);
  if(context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}