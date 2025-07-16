"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import authAPI from "@/lib/api";
import { useEffect, useState } from "react";
import { Threat } from "../../../types/index";
import Image from "next/image";
import perigo from "../../../../public/perigo.jpg";

export default function ThreatsPage() {
  const [threats, setThreat] = useState<Threat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchThreat() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await authAPI.getThreat();
        setThreat(data);
      } catch {
        setError("Erro ao carregar ameaças.");
      } finally {
        setIsLoading(false);
      }
    }

    if (mounted) {
      fetchThreat();
    }
  }, [mounted]);

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
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Seção com imagem de destaque */}
        <section className="relative w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px] xl:h-[350px]">
          <Image
            src={perigo}
            alt="Fogo"
            fill
            className="object-cover"
            priority
          />
        </section>

        {/* Seção de conteúdo */}
        <section className="max-w-5xl mx-auto py-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#6D5E5E] text-center sm:text-left mb-10">
            O QUE COLOCA A AMAZÔNIA EM RISCO
          </h1>

          <ul className="space-y-8 sm:space-y-10 px-4 sm:px-0">
            {threats.map((threat) => (
              <li key={threat.id}>
                <h2 className="text-lg sm:text-2xl text-green-600 font-bold mb-1 sm:mb-2">
                  {threat.name}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  {threat.description}
                </p>

                <hr className="mt-4 sm:mt-6 border-gray-300" />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
