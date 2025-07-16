"use client";
import Footer from "@/components/Footer"; 
import Header from "@/components/Header";
import authAPI from "@/lib/api";
import { useEffect, useState } from "react";
import {Threat} from "../../types/index";


export default function ThreatsPage() {
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
  

  return (
    <>
  <Header />
  <ul>
    {threats.map((threat) => (
      <li key={threat.id}>
        <h2
          style={{
            color: "green",
            fontWeight: 600,
            fontSize: "20px",
            marginBottom: "0.5rem",
            fontStyle: "italic",
            letterSpacing: "1px",
          }}
        >
          {threat.name}
        </h2>
        <p
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "15px",
            marginTop: 0,
            marginBottom: "1.5rem",
          }}
        >
          {threat.description}
        </p>
        <hr />
      </li>
    ))}
  </ul>
  <Footer />
</>
  );
}