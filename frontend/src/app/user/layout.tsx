"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const userContext = useContext(AuthContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evita renderizar HTML diferente no SSR
    return null;
  }

  if (!userContext) {
    return <h1>Erro: Contexto de autenticação não encontrado</h1>;
  }

  if (userContext.loading) {
    return <h1>Carregando...</h1>;
  }

  if (!userContext.user) {
    return <h1>Você não está autenticada com um usuário.</h1>;
  }

  return <main>{children}</main>;
}
