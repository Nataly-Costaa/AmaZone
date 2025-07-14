"use client";

import { useEffect, useState } from "react";
import authAPI from "@/lib/api";
import { Plant } from "@/types";
import Image from "next/image";

import flower from "../../../../public/flower.jpg";
import planta1 from "../../../../public/planta1.jpg";
import aquatica from "../../../../public/aquatica-plant.jpg";
import exotic from "../../../../public/exotic-flower.jpg";

export default function PlantPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchPlants() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await authAPI.getPlants();
        setPlants(data);
      } catch {
        setError("Erro ao carregar plantas.");
      } finally {
        setIsLoading(false);
      }
    }

    if (mounted) {
      fetchPlants();
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
    <main className="bg-white min-h-screen">
      <section className="flex flex-wrap w-full px-1 pt-10 pb-8">
        {[flower, planta1, aquatica, exotic].map((img, index) => (
          <div key={index} className="w-1/2 sm:w-1/4">
            <Image
              src={img}
              alt={`Imagem planta ${index + 1}`}
              className="w-full h-64 object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto  py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#6D5E5E] text-center sm:text-left h-25">
          FLORA AMAZÔNICA
        </h1>

        <ul className="space-y-8 sm:space-y-10 px-4 sm:px-0">
          {plants.map((plant) => (
            <li key={plant.id}>
              <h2 className="text-lg sm:text-2xl text-green-600 font-bold mb-1 sm:mb-2">
                {plant.name}
              </h2>

              <p className="mb-1 italic text-sm sm:text-base text-gray-600">
                {plant.specie}
              </p>

              <p className="mb-2 text-sm sm:text-base">
                {plant.botanicalDescription}
              </p>

              <p className="mb-2 text-sm sm:text-base">
                <span className="font-bold text-[#784545]">
                  Habitat Natural:
                </span>{" "}
                {plant.naturalHabitat}
              </p>

              <p className="text-sm sm:text-base">
                <span className="font-bold text-[#784545]">Benefícios:</span>{" "}
                {plant.benefits}
              </p>

              <hr className="mt-4 sm:mt-6 border-gray-300" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
