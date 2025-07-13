"use client";

import authAPI from "@/lib/api";
import { AuthContextProps, LoginRequest, User } from "@/types";
import { createContext, useEffect, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export default function AuthProvider({children}:AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await authAPI.me();
            if(response.user) {
                setUser(response.user)
            }
        } catch (error) {
            console.log("Usuário não autenticado: ", error);
        } finally {
            setLoading(false);
        }
    }
    checkAuth();
  }, []);

  const login = async ({email, password}:LoginRequest) => {
    try {
        const response = await authAPI.login({email, password})
        setUser(response.user)
    } catch (error){
        console.log("Não foi possível fazer o login", error);
        setUser(null);
    }
  };

  const logout = () => {
    authAPI.logout();
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
