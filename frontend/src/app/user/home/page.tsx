import Image from "next/image";
import amazonia from "../../../../public/amazonia.jpg";
import pordosol from "../../../../public/pordosol.jpg";

export default function HomePage() {
  return (
    <main>
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[350px]">
        <Image
          src={amazonia}
          alt="Paisagem da Amazônia"
          fill
          className="object-cover"
          priority
        />
      </section>

      <section className="px-4 py-8 sm:px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#6D5E5E] text-center sm:text-left">
            O QUE É AMAZÔNIA
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-justify text-[#333] max-w-6xl">
            A Amazônia é a maior floresta tropical do mundo, localizada principalmente no Brasil,
            mas também presente em outros oito países da América do Sul. Rica em biodiversidade,
            abriga milhares de espécies de animais e plantas, muitas ainda desconhecidas pela ciência.
            Além disso, a floresta é essencial para o equilíbrio do clima do planeta, sendo conhecida
            como o “pulmão do mundo” por sua produção de oxigênio. A Amazônia também é lar de diversas
            comunidades indígenas e guarda inúmeros segredos naturais e culturais.
          </p>
        </div>
      </section>

      <section className="flex justify-center items-center py-8">
        <div className="relative w-270 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[350px]">
          <Image 
            src={pordosol} 
            alt="Paisagem por do sol"
            fill
            className="object-cover"
            priority 
          />
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#6D5E5E] text-center sm:text-left">
            IMPORTÂNCIA AMBIENTAL
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-justify text-[#333] max-w-6xl">
            regulador do clima, ajudando a manter o equilíbrio da temperatura e das chuvas em várias regiões do mundo. A floresta também é uma das maiores responsáveis pela produção de oxigênio e pela absorção de gás carbônico, o que ajuda a reduzir os impactos das mudanças climáticas.
            Além disso, a Amazônia abriga uma das maiores biodiversidades do planeta, com milhões de espécies de animais, plantas e microrganismos. Essa diversidade mantém o equilíbrio dos ecossistemas e pode fornecer curas para doenças e soluções sustentáveis para o futuro. Preservar a Amazônia é essencial não apenas para o Brasil, mas para toda a humanidade.
          </p>
        </div>
      </section>
    </main>
  );
}
