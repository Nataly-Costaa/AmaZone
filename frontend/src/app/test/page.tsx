"use client";

import { useEffect, useState } from "react";
import authAPI from "@/lib/api";
import { Threat } from "@/types";

export default function ThreatPage() {
  const [threats, setThreat] = useState<Threat[]>([]); // Armazena a lista de ameaças vindas da API
  const [isLoading, setIsLoading] = useState(true); // Define se os dados ainda estão sendo carregados.
  const [error, setError] = useState<string | null>(null); // Armazena mensagens de erro, se houverem
  const [mounted, setMounted] = useState(false); // Garante que o componente já foi montado no lado do cliente antes de buscar os dados.

  // Roda uma vez só, logo que o componente é montado.
  // Atualiza o estado mounted para true.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchThreat() {
      try {
        setIsLoading(true); 
        setError(null);
        const data = await authAPI.getThreat(); // Chama a API
        setThreat(data); // Salva as ameaças no estado
      } catch {
        setError("Erro ao carregar ameaças.");
      } finally {
        setIsLoading(false);
      }
    }

    if (mounted) {
      fetchThreat(); // Só busca se o componente estiver montado
    }
  }, [mounted]); // Reexecuta se "mounted" mudar

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-[#22A66B] border-t-transparent rounded-full"></div>
          <p className="text-[#22A66B] font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-5xl mx-auto  py-10">

        <ul>
          {threats.map((threat) => (
            <li key={threat.id}>
              <h2>
                {threat.name}
              </h2>
              <p>
                {threat.description}
              </p>
              <hr/>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}