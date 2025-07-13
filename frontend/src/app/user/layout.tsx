"use client";

import { useAuth } from "@/context/AuthContext";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const userContext = useAuth();

  if (!userContext) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-md text-center">
          <h1 className="text-xl font-semibold">Erro</h1>
          <p>Contexto de autenticação não encontrado.</p>
        </div>
      </div>
    );
  }

  if (userContext.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-[#22A66B] border-t-transparent rounded-full"></div>
          <p className="text-[#22A66B] font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!userContext.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-md text-center">
          <h1 className="text-xl font-semibold">Acesso negado</h1>
          <p>Você não está autenticada como usuária.</p>
        </div>
      </div>
    );
  }

  return <main>{children}</main>;
}
