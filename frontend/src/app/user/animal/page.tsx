"use client";

import { useEffect, useState } from "react";
import authAPI from "@/lib/api";
import { Animal } from "@/types";
import Image from "next/image";
import animal1 from "../../../../public/animal1.jpg";
import anaconda from "../../../../public/anaconda.jpg";
import animal4 from "../../../../public/animal4.jpg";
import animal3 from "../../../../public/animal3.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AnimalPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await authAPI.getAnimals();
        setAnimals(data);
      } catch {
        setError("Erro ao carregar animais.");
      } finally {
        setIsLoading(false);
      }
    }

    if (mounted) {
      fetchAnimals();
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
        <section className="flex flex-wrap m-0 p-0 pb-8 pt-10 px-1">
          <div className="w-1/2 sm:w-1/4">
            <Image
              src={animal1}
              alt="Animal no galho de uma árvore"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="w-1/2 sm:w-1/4">
            <Image
              src={anaconda}
              alt="Anaconda"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="w-1/2 sm:w-1/4">
            <Image
              src={animal4}
              alt="Ave"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="w-1/2 sm:w-1/4">
            <Image
              src={animal3}
              alt="Animal na floresta"
              className="w-full h-64 object-cover"
            />
          </div>
        </section>

        <section className="p-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#6D5E5E] text-center sm:text-left h-25">
            VIDA ANIMAL
          </h1>
          <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {animals.map((animal) => (
                <li
                  key={animal.id}
                  className="border border-[#22a66b] rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-1 text-[#22a66b]">
                    {animal.nome}
                  </h2>
                  <p className="mb-1">{animal.descricao}</p>
                  <p>
                    <span className="font-semibold text-[#784545]">
                      Gênero:{" "}
                    </span>
                    {animal.genero}
                  </p>
                  <p>
                    <span className="font-semibold text-[#784545]">
                      População Estimada:{" "}
                    </span>
                    {animal.popEstimada}
                  </p>
                  <p>
                    <span className="font-semibold text-[#784545]">
                      Nível de Ameaça:{" "}
                    </span>
                    {animal.nivelAmeaca}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
