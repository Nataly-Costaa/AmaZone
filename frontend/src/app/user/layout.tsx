"use client"

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

interface UserLayoutProps {
    children: React.ReactNode;
}

export default function UserLayout({children}:UserLayoutProps) {
    const userContext = useContext(AuthContext)

    if(!userContext) {
        return <h1>Error: Contexto de autenticação não encontrado</h1>
    }

    if(userContext.loading) {
        return <h1>Carregando...</h1>
    }

    if(!userContext.user) {
        return <h1>Você não estar autenticado com usuario</h1>
    }

  return (
    <main>{children}</main>
  )
}
