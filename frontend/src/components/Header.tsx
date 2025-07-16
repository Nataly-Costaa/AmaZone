"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { logout } = useAuth(); // importa do contexto
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // chama o logout da API
    router.push("/login"); // redireciona para o login após logout
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 bg-[#22a66b] h-auto py-4 sm:py-0 sm:h-16">
      <div className="w-full sm:w-40 flex justify-center sm:justify-center items-center mb-2 sm:mb-0">
        <p className="text-2xl text-white">
          Ama<span className="text-[#784545]">Zone</span>
        </p>
      </div>

      <nav className="w-full sm:w-140 flex flex-wrap justify-center sm:justify-around gap-4 text-white">
        <Link
          href="/user/home"
          className="hover:text-[#784545] transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/user/animal"
          className="hover:text-[#784545] transition-colors duration-200"
        >
          Animal
        </Link>
        <Link
          href="/user/plant"
          className="hover:text-[#784545] transition-colors duration-200"
        >
          Plantas
        </Link>
        <Link
          href="/user/ameacas"
          className="hover:text-[#784545] transition-colors duration-200"
        >
          Ameaças
        </Link>
        <button
          onClick={handleLogout}
          className="hover:text-[#784545] transition-colors duration-200 cursor-pointer"
          title="Sair"
        >
          <LogOut />
        </button>
      </nav>
    </header>
  );
}
